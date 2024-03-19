<?php
/*	Template Name:	Legacy Utah Courts Gov	*/

?>

<?php get_header(); ?>

<?php

$uri = "";

$fields = parse_url($uri);

// build the DSN including SSL settings
$conn = "mysql:";
$conn .= "host=" . $fields["host"];
$conn .= ";port=" . $fields["port"];;
$conn .= ";dbname=defaultdb";
$conn .= ";sslmode=verify-ca;sslrootcert=ca.pem";

$new_table_name = "Alpine Justice Court"; //"aaa_new_records";

try {
    $db = new PDO($conn, $fields["user"], $fields["pass"]);

    $page = isset($_GET['pg']) ? (int)$_GET['pg'] : 1;
    $category = isset($_GET['category']) ? $_GET['category'] : '';
    $search = isset($_GET['search']) ? $_GET['search'] : '';

    $itemsPerPage = 10; // Change as needed
    $offset = ($page - 1) * $itemsPerPage;

    $totalsql = "SELECT COUNT(*) AS totalRows FROM `" . $new_table_name . "` WHERE 1";
    $sql = "SELECT * FROM `" . $new_table_name . "` WHERE 1";

    if (!empty($category)) {
        $sql .= " AND trial_type = :category";
        $totalsql .= " AND trial_type = :category";
    }
    if (!empty($search)) {
        $sql .= " AND (case_number LIKE :search OR trial_type LIKE :search OR count_time LIKE :search OR count_date LIKE :search)";
        $totalsql .= " AND (case_number LIKE :search OR trial_type LIKE :search OR count_time LIKE :search OR count_date LIKE :search)";
    }
    $sql .= " LIMIT :offset, :itemsPerPage";
    //  total count
    $stmt = $db->prepare($totalsql);

    if (!empty($category)) {
        $stmt->bindParam(':category', $category, PDO::PARAM_STR);
    }
    if (!empty($search)) {
        $searchTerm = "%$search%";
        $stmt->bindParam(':search', $searchTerm, PDO::PARAM_STR);
    }

    $stmt->execute();
    $rowCount = $stmt->fetch(PDO::FETCH_ASSOC);
    $totalRows = $rowCount['totalRows'];
    //  total count
    //  for page
    $stmt = $db->prepare($sql);

    if (!empty($category)) {
        $stmt->bindParam(':category', $category, PDO::PARAM_STR);
    }
    if (!empty($search)) {
        $searchTerm = "%$search%";
        $stmt->bindParam(':search', $searchTerm, PDO::PARAM_STR);
    }
    $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
    $stmt->bindParam(':itemsPerPage', $itemsPerPage, PDO::PARAM_INT);

    $stmt->execute();

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //  for page
    //  get types
    $typessql = "SELECT DISTINCT trial_type FROM `$new_table_name`";
    $stmt = $db->query($typessql);
    $types = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //  get types
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

$totalPages = ceil($totalRows / $itemsPerPage);

$protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ? "https" : "http";
$host = $_SERVER['HTTP_HOST'];
$uri = $_SERVER['REQUEST_URI'];
$fullURL = $protocol . '://' . $host . $uri;
if (substr($fullURL, -1) == '/') {
    $modifiedURL = substr($fullURL, 0, -1);
} else {
    $modifiedURL = $fullURL;
}
?>

<main id="content" class="site-main">
    <div class="flex justify-between align-bottom">
        <div class="pagination-bar">
            <?php
            echo "<a href='?pg=" . ($page - 1) . "&category=$category&search=$search' class='pagination-item' " . ($page == 1 ? "disabled" : "") . ">Prev</a> ";
            for ($i = 1; $i <= $totalPages; $i++) {
                echo "<a href='?pg=$i&category=$category&search=$search' class='pagination-item " . ($i == $page ? "active" : "inactive") . "'>$i</a> ";
            }
            echo "<a href='?pg=" . ($page + 1) . "&category=$category&search=$search' class='pagination-item' " . ($page == $totalPages ? "disabled" : "") . ">Next</a> ";
            ?>
        </div>
        <div class="search-bar">
            <form action="?" method="get">
                <input type="text" name="search" id="search" placeholder="Search in" value="<?php echo $search ?>" />
                <input type="text" name="category" hidden value="<?php echo $category ?>" />
                <input type="submit" value="Search" />
            </form>
        </div>
    </div>
    <div id="primary" class="content-area">
		<div class="table-responsive">
			<table>
				<thead>
					<tr>
						<th>No</th>
						<th>Case Number</th>
						<th style="margin:0;padding:0;">
							<form action="?" method="get" id="category-form">
								<input type="text" name="search" hidden value="<?php echo $search ?>" />
								<select name="category" onchange="handleCategoryInputChange()">
									<option value="">All Trial Type</option>
									<?php foreach ($types as $type) : ?>
										<option value="<?php echo htmlspecialchars($type['trial_type']); ?>" <?php echo htmlspecialchars($type['trial_type']) === $category ? "selected" : ""; ?>><?php echo htmlspecialchars($type['trial_type']); ?></option>
									<?php endforeach; ?>
								</select>
							</form>
						</th>
						<th>Time/Date</th>
						<th>Plantiff</th>
						<th>Defendant</th>
						<th>Attorney</th>
						<th>Type</th>
						<th>Court</th>
					</tr>
				</thead>
				<tbody>
					<?php
					$i = 1;
					foreach ($results as $row) : ?>
						<tr>
							<td><?php echo ($page - 1) * $itemsPerPage + $i++; ?></td>
							<td><?php echo $row['case_number']; ?></td>
							<td><?php echo $row['trial_type']; ?></td>
							<td>
								<?php echo $row['count_time']; ?>
								<br></br>
								<?php echo $row['count_date']; ?>
							</td>
							<td><?php echo $row['case_plantiff']; ?></td>
							<td><?php echo $row['case_defendant']; ?></td>
							<td><?php echo $row['case_attorney']; ?></td>
							<td><?php echo $row['case_type']; ?></td>
							<td><?php echo $row['court']; ?></td>
						</tr>
					<?php endforeach; ?>
				</tbody>
			</table>
		</div>
    </div>
    <div class="pagination-bar">
        <?php
        echo "<a href='?pg=" . ($page - 1) . "&category=$category&search=$search' class='pagination-item' " . ($page == 1 ? "disabled" : "") . ">Prev</a> ";
        for ($i = 1; $i <= $totalPages; $i++) {
            echo "<a href='?pg=$i&category=$category&search=$search' class='pagination-item " . ($i == $page ? "active" : "inactive") . "'>$i</a> ";
        }
        echo "<a href='?pg=" . ($page + 1) . "&category=$category&search=$search' class='pagination-item' " . ($page == $totalPages ? "disabled" : "") . ">Next</a> ";
        ?>
    </div>

</main>

<script>
    function handleCategoryInputChange() {
        document.getElementById("category-form").submit()
    }
</script>

<?php get_footer(); ?>