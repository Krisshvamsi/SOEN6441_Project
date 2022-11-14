import sqlite3

from JSON_toDF import dataframe

conn = sqlite3.connect('database.db')
c = conn.cursor()
c.execute(
    'CREATE TABLE IF NOT EXISTS NBA (id number, abbreviation text, city text,conference text,division text,full_name text, name text)')
conn.commit()
dataframe.to_sql('NBA', conn, if_exists='replace', index=False)

