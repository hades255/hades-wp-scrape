from selenium.webdriver.common.by import By
import time
from seleniumbase import Driver
from selenium.webdriver.support.ui import Select
import schedule
import pymysql

timeout = 10

def scrape_check():
    conn = pymysql.connect(
        charset="utf8mb4",
        connect_timeout=timeout,
        cursorclass=pymysql.cursors.DictCursor,
        db="defaultdb",
        host="mysql-3ddd3780-montgasam-5f54.a.aivencloud.com",
        password="",
        read_timeout=timeout,
        port=12366,
        user="avnadmin",
        write_timeout=timeout,
    )

    time.sleep(2)
    driver = Driver(uc=True)
    driver.get("https://legacy.utcourts.gov/cal/reports.php")

    cursor = conn.cursor()
    new_table_name="aaa_new_records"
    drop_table_query = f"DROP TABLE IF EXISTS `{new_table_name}`  "
    cursor.execute(drop_table_query)
    conn.commit()
    time.sleep(2)
    
    create_table_query = f"CREATE TABLE IF NOT EXISTS `{new_table_name}`  (ID int(11) NOT NULL AUTO_INCREMENT,case_number TEXT, trial_type TEXT, count_time TEXT, count_date TEXT, case_plantiff TEXT,case_defendant TEXT,case_attorney TEXT ,case_type TEXT, court TEXT, PRIMARY KEY (`ID`))"
    cursor.execute(create_table_query)
    conn.commit()
    
    option_list = []
    option_names = []
    options = driver.find_elements(By.XPATH, '//*[@id="loc"]/optgroup/option')
    for option in options:
        option_value = option.get_attribute('value')
        option_name = option.text
        option_list.append(option_value)
        option_names.append(option_name)

    for i in range(len(option_list)):
        
        option = option_list[i]
        option_name = option_names[i]
        
        #getting old data
        old_data = []
        try:
            sele = f"SELECT * FROM `{option_name}`"
            cursor.execute(sele)

            for row in cursor:
                
                old_data.append(row)
        except:
            pass

        allcase = []
        for i in old_data:
            c = i.get("case_number")
            t = i.get("count_time")
            d= i.get("count_date")
            
            allcase.append(f"{c}-{t}-{d}")

        #end of old data

        drop_down = driver.find_element(By.XPATH, '//*[@id="loc"]')
        select = Select(drop_down)
        select.select_by_value(option)
        driver.find_element(By.CLASS_NAME, 'button').click()
        
        create_table_query = f"CREATE TABLE IF NOT EXISTS `{option_name}` (ID int(11) NOT NULL AUTO_INCREMENT,case_number TEXT, trial_type TEXT, count_time TEXT, count_date TEXT, case_plantiff TEXT,case_defendant TEXT,case_attorney TEXT ,case_type TEXT ,PRIMARY KEY (`ID`))"
        cursor.execute(create_table_query)
        conn.commit()
        #end

        #looping through data to remove duplicates
        while True:
            case_numbers = driver.find_elements(By.XPATH, '/html/body/div[1]/div/div/div/div/div[2]/div/div[3]/div[2]/div[3]/p')
            trial_types = driver.find_elements(By.XPATH, '/html/body/div[1]/div/div/div/div/div[2]/div/div[3]/div[1]/div[2]')
            count_times = driver.find_elements(By.XPATH, '/html/body/div[1]/div/div/div/div/div[2]/div/div[3]/div[1]/div[1]/strong[1]')
            count_dates = driver.find_elements(By.XPATH, '/html/body/div[1]/div/div/div/div/div[2]/div/div[3]/div[1]/div[2]/strong[1]')
            case_plantiffs = driver.find_elements(By.XPATH, '/html/body/div[1]/div/div/div/div/div[2]/div/div[3]/div[2]/div[1]/p/span[1]')
            case_defendants = driver.find_elements(By.XPATH, '/html/body/div[1]/div/div/div/div/div[2]/div/div[3]/div[2]/div[1]/p/span[2]')
            case_attorneys = driver.find_elements(By.XPATH, '/html/body/div[1]/div/div/div/div/div[2]/div/div[3]/div[2]/div[2]/p[2]')
            case_types = driver.find_elements(By.XPATH, '/html/body/div[1]/div/div/div/div/div[2]/div/div[3]/div[2]/div[3]/p')
            
            
            for i in range(len(case_numbers)):
                

                case_number = case_numbers[i].text.split('\n')[0].split('# ')[1]
                trial_type = trial_types[i].text.split('\n')[1]
                count_time = count_times[i].text
                count_date = count_dates[i].text
                try:
                    case_plantiff = case_plantiffs[i].text
                except:
                    case_plantiff = ""

                try:
                    case_defendant = case_defendants[i].text
                except:
                    case_defendant = ""
                try:
                    case_attorney = case_attorneys[i].text
                except:
                    case_attorney = ""
                try:
                    case_type = case_types[i].text.split('\n')[1]
                except:
                    case_type = ""
                    
                checker = f"{case_number}-{count_time}-{count_date}"

                if checker in allcase:
                    print(f"old data-{case_number}")
                    
                else:
                    print(f"New data-{case_number}\n")

                    insert_query = f"INSERT INTO `{option_name}` (case_number, trial_type , count_time , count_date, case_plantiff,case_defendant,case_attorney ,case_type) VALUES ( %s,%s,%s,%s,%s,%s,%s,%s)"
                    cursor.execute(insert_query, (case_number, trial_type, count_time, count_date,case_plantiff,case_defendant,case_attorney,case_type))
                    conn.commit()

                    insert_query = f"INSERT INTO `{new_table_name}` (case_number, trial_type , count_time , count_date, case_plantiff,case_defendant,case_attorney ,case_type, court) VALUES ( %s,%s,%s,%s,%s,%s,%s,%s,%s)"
                    cursor.execute(insert_query, (case_number, trial_type, count_time, count_date,case_plantiff,case_defendant,case_attorney,case_type, option_name))
                    conn.commit()

                    print(f"Added to {option_name}")
                    
            try:
                next_btn = driver.find_element(By.XPATH, '/html/body/div[1]/div/div/div/div/div[2]/div[3]/form[3]/button')
                if (next_btn.get_attribute('class') == "paging" ):
                    next_btn.click()
                else :
                    break
            except:
                break
    conn.close()
    driver.close()

# schedule.every().day.at("00:00").do(scrape_check)

# while True:
#     schedule.run_pending()
#     time.sleep(1)

scrape_check()