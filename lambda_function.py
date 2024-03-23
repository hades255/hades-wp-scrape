import requests
from bs4 import BeautifulSoup
import pymysql
from datetime import datetime

def lambda_handler(event, context):
    print(f"\nstart\n")
    url="https://legacy.utcourts.gov/cal/reports.php"
    new_table_name="aaa_new_records"

    conn = pymysql.connect()

    cursor = conn.cursor()
    
    current_datetime = datetime.now()
    current_datetime_string = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    insert_query = f"INSERT INTO `aaa_new_records_1` (case_number) VALUES ( %s)"
    cursor.execute(insert_query, (current_datetime_string))
    conn.commit()

    drop_table_query = f"DROP TABLE IF EXISTS `{new_table_name}`  "
    cursor.execute(drop_table_query)
    conn.commit()
    
    create_table_query = f"CREATE TABLE IF NOT EXISTS `{new_table_name}`  (ID int(11) NOT NULL AUTO_INCREMENT,case_number TEXT, trial_type TEXT, count_time TEXT, count_date TEXT, case_plantiff TEXT,case_defendant TEXT,case_attorney TEXT ,case_type TEXT, court TEXT, PRIMARY KEY (`ID`))"
    cursor.execute(create_table_query)
    conn.commit()

    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    option_list = []
    option_names = []
    dropdown = soup.select_one('#loc optgroup')
    options = dropdown.find_all('option') if dropdown else []

    for option in options:
        option_value = option.get('value')
        option_name = option.text.strip()
        option_list.append(option_value)
        option_names.append(option_name)

    for i in range(len(option_list)):
        option = option_list[i]
        option_name = option_names[i]
        print(f"option name-{option_name}")
        print(f"option list-{option}")
        

        allcase = []
        try:
            sele = f"SELECT * FROM `{option_name}`"
            cursor.execute(sele)

            for row in cursor:
                allcase.append(row.get("case_number"))
        except:
            pass

        response = requests.post(url, data={
            "loc":option
        })

        print(response.status_code)
        if(response.status_code == 200):
            soup = BeautifulSoup(response.content, 'html.parser')

            create_table_query = f"CREATE TABLE IF NOT EXISTS `{option_name}` (ID int(11) NOT NULL AUTO_INCREMENT,case_number TEXT,PRIMARY KEY (`ID`))"
            cursor.execute(create_table_query)
            conn.commit()

            divs = soup.find_all('div',attrs={"class": 'nobreakdiv'})
            for div in divs:
                box=div.find('div',attrs={'class':'box'})
                case_number_div = box.css.select_one('div:nth-of-type(2) > div:nth-of-type(3) > p')

                case_number = case_number_div.text.strip().split('\n')[0].split('# ')[1]

                if case_number in allcase:
                    print(f"old data-{case_number}")

                else:
                    print(f"New data-{case_number}")

                    insert_query = f"INSERT INTO `{option_name}` (case_number) VALUES ( %s)"
                    cursor.execute(insert_query, (case_number))
                    conn.commit()

                
                    trial_type_div = box.css.select_one('div:nth-of-type(1) > div:nth-of-type(2)')
                    count_time_div = box.css.select_one('div:nth-of-type(1) > div:nth-of-type(1) > strong:nth-of-type(1)')
                    count_date_div = box.css.select_one('div:nth-of-type(1) > div:nth-of-type(2) > strong:nth-of-type(1)')
                    case_plantiff_div = box.css.select_one('div:nth-of-type(2) > div:nth-of-type(1) > p > span:nth-of-type(1)')
                    case_defendant_div = box.css.select_one('div:nth-of-type(2) > div:nth-of-type(1) > p > span:nth-of-type(2)')
                    case_attorney_div = box.css.select_one('div:nth-of-type(2) > div:nth-of-type(2) > p:nth-of-type(2)')
                    
                    trial_type = trial_type_div.text.strip().split('\n')[-1]
                    count_time = count_time_div.text
                    count_date = count_date_div.text
                    try:
                        case_plantiff = case_plantiff_div.text
                    except:
                        case_plantiff = ""
                    try:
                        case_defendant = case_defendant_div.text
                    except:
                        case_defendant = ""
                    try:
                        case_attorney = case_attorney_div.text
                    except:
                        case_attorney = ""
                    try:
                        case_type = case_number_div.text.strip().split('\n')[1]
                    except:
                        case_type = ""

                    insert_query = f"INSERT INTO `{new_table_name}` (case_number, trial_type , count_time , count_date, case_plantiff,case_defendant,case_attorney ,case_type, court) VALUES ( %s,%s,%s,%s,%s,%s,%s,%s,%s)"
                    cursor.execute(insert_query, (case_number, trial_type, count_time, count_date,case_plantiff,case_defendant,case_attorney,case_type, option_name))
                    conn.commit()

                    print(f"Added to {option_name}\n")
        print(f"****************************************************************************")

    conn.close()
    print(f"\nfinish\n")


