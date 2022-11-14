import sqlite3 from "sqlite3";
let db = new sqlite3.Database('database.db');


class NBA {
    constructor(req, res) {
        this.req = req
        this.res = res
    }

    static instance(req, res) {
        if (!NBA._instance) {
            return new NBA(req, res);
        }

        return NBA._instance;
    }

    modifyRow() {
        const sql = "SELECT * FROM NBA where id=?";
        const id = this.req.query.id;
        db.get(sql, id, (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            if(rows===undefined){
                this.res.send(`<p>The Team you wish to update doesn't exist. Please enter the correct id of the team</p><br>
                              <a href="/update">Re-Enter the id of the team</a>&nbsp&nbsp
                               <a href="/">Back to Home</a>`)
           }
            else {
                this.res.send(`<body>
                <h1>You can now edit the team details for Team ${rows['full_name']}</h1>
                <p >You are updating the details for team with ID:${rows['id']}<p>
                <form action="updateteam" method="POST">
                <label for="abbreviation">Abbreviation of the team: </label>
                <input type="text" id="abbreviation" name="abbreviation" value="${rows['abbreviation']}"><br><br>
                <label for="city">City: </label>
                <input type="text" id="city" name="city" value="${rows['city']}" ><br><br>
                <label for="conference">Conference:</label>
                <input type="text" id="conference" name="conference" value=" ${rows['conference']}" ><br><br>
                <label for="division">Division of the team: </label>
                <input type="text" id="division" name="division" value="${rows['division']}"><br><br>
                <label for="full_name">Full Name of the team:</label>
                <input type="text" id="full_name" name="full_name" value=" ${rows['full_name']}" ><br><br>
                <label for="name">Name of the team: </label>
                <input type="text" id="name" name="name" value="${rows['name']}"><br><br>
                <input type="submit" value="Submit"><br><br>
                <a href="/">Back to Home</a>
                </form>
                </body> `)
                }
        });
    }

    modifyRow1() {
        const sql = "UPDATE NBA SET abbreviation=?, city=?, division=?, full_name=?, name=? WHERE id=?";
        const team = [this.req.body.abbreviation, this.req.body.city, this.req.body.division, this.req.body.full_name, this.req.body.name, this.req.body.id];
        db.run(sql, team, err => {
            if (err) {

                return console.error(err.message);
            }
            let hh = {
                abbreviation:team[0],
                city:team[1],
                division:team[2],
                full_name:team[3],
                name:team[4],
                id:team[5]
            }
            this.res.json(hh);
            this.res.send(`<h1>Success</h1>
                           <p>The Team details have been successfully Updated!</p>
                           <a href="/">Back to Home</a>`);
        });
    }

    deleteRow() {
        let full_name = this.req.query.full_name;
        const sql = "DELETE FROM NBA where full_name=?";
        db.get(sql, full_name, (err,rows) => {
            if (err) {
                return console.error(err.message);
            }

           //  if(rows===undefined){
           //      this.res.send(`<p>The Team you wish to unregister doesn't exist. Please enter correct full name of the team</p><br>
           //                    <a href="/unregister">Re-Enter the full name of team</a>&nbsp&nbsp
           //                     <a href="/">Back to Home</a>`)
           // }

            else {
                this.res.send(`<h1>The Team has been successfully unregistered </h1>
               <a href="/">Back to Home</a>`)
            }
        });
    }

    getRow() {
        let full_name = this.req.query.full_name;
        const sql = "SELECT * FROM NBA where full_name=?";
        db.get(sql, [full_name], (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            if(rows===undefined){
               this.res.json(rows);
                // this.res.send(`<p>The Team you wish to view doesn't exist. Please enter correct full name of the team</p><br>
                //              <a href="/search">Re-Enter the full name of team</a>&nbsp&nbsp
                //                <a href="/">Back to Home</a>`)
           }
            else {
                this.res.json(rows);
                this.res.send(`
                  <body>
                  <h2>The Team details of ${rows['full_name']} are as follows</h2>
                  <p>ID of the team: ${rows['id']}</p>
                  <p>Abbreviation of the team: ${rows['abbreviation']}</p>
                  <p>City to which it belongs: ${rows['city']}</p>
                  <p>Conference: ${rows['conference']}</p>
                  <p>The Division of the team is: ${rows['division']}</p><br><br>
                  <a href="/">Back to Home</a>
                  </body>`)
                }
        })
    }

    addRow() {
        const sql = "INSERT INTO NBA (id, abbreviation, city, conference, division, full_name, name) VALUES (?, ?, ?, ?, ?, ?,?)";
        const team = [this.req.body.id, this.req.body.abbreviation, this.req.body.city, this.req.body.conference, this.req.body.division, this.req.body.full_name, this.req.body.name];
        db.run(sql, team, err => {
            if (err) {
                return console.error(err.message);
            }
            let hh = {
                id:team[0],
                abbreviation:team[1],
                city:team[2],
                conference:team[3],
                division:team[4],
                full_name:team[5],
                name:team[6],
            }
            this.res.json(hh);
            // this.res.send(`<h1>Success</h1>
            //                <p>Your Team has been successfully Registered!</p><br><br>
            //                 <a href="/">Back to Home</a> `);
        });

    }
    addRow1() {
        this.res.send(`<h1>Please enter your team details </h1>
            <form action="/register" method="POST">
            <label for="id">ID: </label>
            <input type="text" id="id" name="id" ><br><br>
            <label for="abbreviation">Abbreviation of the team: </label>
            <input type="text" id="abbreviation" name="abbreviation" ><br><br>
            <label for="city">City: </label>
            <input type="text" id="city" name="city" ><br><br>
            <label for="conference">Conference:</label>
            <input type="text" id="conference" name="conference" ><br><br>
            <label for="division">Division of the team: </label>
            <input type="text" id="division" name="division" ><br><br>
            <label for="full_name">Full Name of the team:</label>
            <input type="text" id="full_name" name="full_name" ><br><br>
            <label for="name">Name of the team: </label>
            <input type="text" id="name" name="name" ><br><br>
            <input type="submit" value="Submit"><br><br>
            <a href="/">Back to Home</a>
            </form>`)
        }
}

export default NBA;