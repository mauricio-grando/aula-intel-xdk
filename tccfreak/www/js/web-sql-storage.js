var WebSqlDB = function (successCallback, errorCallback) {

    this.initializeDatabase = function (successCallback, errorCallback) {

        // This here refers to this instance of the webSqlDb
        var self = this;

        // Open/create the database
        this.db = window.openDatabase("tccfreakdb", "1.0", "TCCFreak Database", 4 * 1024 * 1024);

        // WebSQL databases are tranaction based so all db querying must be done within a transaction
        this.db.transaction(
            function (tx) {
                self.createTable(tx);
                self.addSampleData(tx);
            },
            function (error) {
                console.log('Transaction error: ' + error);
                if (errorCallback) errorCallback();
            },
            function () {
                console.log('DEBUG - 5. initializeDatabase complete');
                if (successCallback) successCallback();
            }
        );
    };

    this.createTable = function (tx) {
        var sqlTrabalho =
            " create table if not exists trabalho ( " +
            "     codtra integer primary key autoincrement not null, " +
            "     nomtra varchar(60) not null, " +
            "     nomcur varchar(45) not null " +
            " ) ";
        var sqlAluno =
            " create table if not exists aluno ( " +
            "     codalu integer primary key autoincrement not null, " +
            "     nomalu varchar(45) not null, " +
            "     nomcur varchar(45) not null, " +
            "     fotalu text " +
            " ) ";
        var sqlFrequencia =
            " create table if not exists frequencia ( " +
            "     codfrq integer primary key autoincrement not null, " +
            "     codtra integer not null, " +
            "     datfrq datetime " +
            " ); ";
        var sqlFrequenciaAluno =
            " create table if not exists frequencia_aluno ( " +
            "     codfrqalu integer primary key autoincrement not null, " +
            "     codalu integer not null, " +
            "     codfrq integer not null, " +
            "     sitalu char(1) check (sitalu in ('P','A')) not null , " +
            "     assalu text " +
            " ); ";

        tx.executeSql(sqlAluno, null,
            function () { // Success callback
                console.log('DEBUG - 3. DB Tables created succesfully');
            },
            function (tx, error) { // Error callback
                alert('Create table error: ' + error.message);
            });
        tx.executeSql(sqlTrabalho, null,
            function () { // Success callback
                console.log('DEBUG - 3. DB Tables created succesfully');
            },
            function (tx, error) { // Error callback
                alert('Create table error: ' + error.message);
            });
        tx.executeSql(sqlFrequencia, null,
            function () { // Success callback
                console.log('DEBUG - 3. DB Tables created succesfully');
            },
            function (tx, error) { // Error callback
                alert('Create table error: ' + error.message);
            });
        tx.executeSql(sqlFrequenciaAluno, null,
            function () { // Success callback
                console.log('DEBUG - 3. DB Tables created succesfully');
            },
            function (tx, error) { // Error callback
                alert('Create table error: ' + error.message);
            });
    };

    this.addSampleData = function (tx) {
        var frequencias = [
            {
                "codfrq": 1,
                "codtra": 1,
                "datfrq": "7/7/2016"
            },
            {
                "codfrq": 2,
                "codtra": 2,
                "datfrq": "7/7/2016"
            },
            {
                "codfrq": 3,
                "codtra": 3,
                "datfrq": "7/7/2016"
            }
            ];

        var frequenciasAluno = [
            {
                "codfrqalu": 1,
                "codalu": 1,
                "codfrq": 1,
                "sitalu": 'P',
                "assalu": 'hahaha'
            },
            {
                "codfrqalu": 2,
                "codalu": 2,
                "codfrq": 2,
                "sitalu": 'P',
                "assalu": 'hahaha'
            },
            {
                "codfrqalu": 3,
                "codalu": 3,
                "codfrq": 3,
                "sitalu": 'A',
                "assalu": 'hahaha'
            }
            ];


        // Array of objects
        var trabalhos = [
            {
                "codtra": 1,
                "nomtra": "TCC 01",
                "nomcur": "Ciência da Computação"
            },
            {
                "codtra": 2,
                "nomtra": "TCC 02",
                "nomcur": "Ciência da Computação"
            },
            {
                "codtra": 3,
                "nomtra": "TCC 03",
                "nomcur": "Administração"
            },
            {
                "codtra": 4,
                "nomtra": "TCC 04",
                "nomcur": "Ciências Contábeis"
            }
            ];

        // Array of objects
        var alunos = [
            {
                "codalu": 1,
                "nomalu": "Aluno 1",
                "nomcur": "Ciência da Computação",
                fotalu: "aluno1.png"
            },
            {
                "codalu": 2,
                "nomalu": "Aluno 2",
                "nomcur": "Ciência da Computação",
                fotalu: "aluno2.png"
            },
            {
                "codalu": 3,
                "nomalu": "Aluno 3",
                "nomcur": "Administração",
                fotalu: "aluno3.png"
            },
            {
                "codalu": 4,
                "nomalu": "Aluno 4",
                "nomcur": "Administração",
                fotalu: "aluno4.png"
            },
            {
                "codalu": 5,
                "nomalu": "Aluno 5",
                "nomcur": "Ciências Contábeis",
                fotalu: "aluno5.png"
            },
            {
                "codalu": 6,
                "nomalu": "Aluno 6",
                "nomcur": "Ciências Contábeis",
                fotalu: "aluno6.png"
            }
            ];

        var lt = trabalhos.length;
        var la = alunos.length;
        var lf = frequencias.length;
        var lfa = frequenciasAluno.length;

        var sqlT = "INSERT OR REPLACE INTO trabalho " +
            " (codtra, nomtra, nomcur) " +
            " VALUES (?, ?, ?)";
        var sqlA = "INSERT OR REPLACE INTO aluno " +
            " (codalu, nomalu, nomcur, fotalu) " +
            " VALUES (?, ?, ?, ?)";
        var sqlF = "INSERT OR REPLACE INTO frequencia " +
            " (codfrq, codtra, datfrq) " +
            " VALUES (?, ?, ?)";
        var sqlFA = "INSERT OR REPLACE INTO frequencia_aluno " +
            " (codfrqalu, codalu, codfrq, sitalu, assalu) " +
            " VALUES (?, ?, ?, ?, ?)";

        var t;
        var a;
        var f;
        var fa;

        // Loop through sample data array and insert into db
        for (var i = 0; i < lt; i++) {
            t = trabalhos[i];
            tx.executeSql(sqlT, [t.codtra, t.nomtra, t.nomcur],
                function () { // Success callback
                    console.log('DEBUG - 4. Sample data DB insert success');
                },
                function (tx, error) { // Error callback
                    alert('INSERT error: ' + error.message);
                });
        }

        for (var i = 0; i < la; i++) {
            a = alunos[i];
            tx.executeSql(sqlA, [a.codalu, a.nomalu, a.nomcur, a.fotalu],
                function () { // Success callback
                    console.log('DEBUG - 4. Sample data DB insert success');
                },
                function (tx, error) { // Error callback
                    alert('INSERT error: ' + error.message);
                });
        }

        for (var i = 0; i < lf; i++) {
            f = frequencias[i];
            tx.executeSql(sqlF, [f.codfrq, f.codtra, f.datfrq],
                function () { // Success callback
                    console.log('DEBUG - 4. Sample data DB insert success');
                },
                function (tx, error) { // Error callback
                    alert('INSERT error: ' + error.message);
                });
        }

        for (var i = 0; i < lfa; i++) {
            fa = frequenciasAluno[i];
            tx.executeSql(sqlFA, [fa.codfrqalu, fa.codalu, fa.codfrq, fa.sitalu, fa.assalu],
                function () { // Success callback
                    console.log('DEBUG - 4. Sample data DB insert success');
                },
                function (tx, error) { // Error callback
                    alert('INSERT error: ' + error.message);
                });
        }

    };

    this.findTrabalhoAll = function (callback) {
        this.db.transaction(
            function (tx) {
                var sql = "SELECT * FROM trabalho";
                tx.executeSql(sql, null, function (tx, results) {
                    var len = results.rows.length,
                        trabalhos = [],
                        i = 0;
                    for (; i < len; i++) {
                        trabalhos[i] = results.rows.item(i);
                    }

                    // Passes a array with values back to calling function
                    callback(trabalhos);
                });
            },
            function (tx, error) {
                alert("Transaction Error findAll: " + error);
            }
        );
    };

    this.findFrequenciaAll = function (callback) {
        this.db.transaction(
            function (tx) {
                var sql = "SELECT * FROM frequencia";
                tx.executeSql(sql, null, function (tx, results) {
                    var len = results.rows.length,
                        frequencias = [],
                        i = 0;
                    for (; i < len; i++) {
                        frequencias[i] = results.rows.item(i);
                    }

                    // Passes a array with values back to calling function
                    callback(frequencias);
                });
            },
            function (tx, error) {
                alert("Transaction Error findAll: " + error);
            }
        );
    };

    this.findTrabalhoById = function (codtra, callback) {
        this.db.transaction(
            function (tx) {
                var sql = "SELECT * FROM trabalho WHERE codtra=?";
                tx.executeSql(sql, [codtra], function (tx, results) {
                    // This callback returns the first results.rows.item if rows.length is 1 or return null
                    callback(results.rows.length === 1 ? results.rows.item(0) : null);
                });
            },
            function (tx, error) {
                alert("Transaction Error: " + error.message);
            }
        );
    };

    this.insertTrabalho = function (json, callback) {
        // Converts a JavaScript Object Notation (JSON) string into an object.
        var parsedJson = JSON.parse(json);
        this.db.transaction(
            function (tx) {
                var sql = "INSERT INTO trabalho (nomtra, nomcur) VALUES (?, ?)";
                tx.executeSql(sql, [parsedJson.nomtra, parsedJson.nomcur], function (tx, result) {
                    // If results rows
                    callback(result.rowsAffected === 1 ? true : false);
                });
            }
        );
    };

    this.insertFrequencia = function (json, callback) {

        // Converts a JavaScript Object Notation (JSON) string into an object.
        var parsedJson = JSON.parse(json);
        this.db.transaction(
            function (tx) {
                var sql = "INSERT INTO frequencia (codtra, datfrq) VALUES (?, ?)";
                tx.executeSql(sql, [parsedJson.codtra, parsedJson.datfrq], function (tx, result) {
                    // If results rows
                    callback(result);
                });
            }
        );
    };

    this.insertFrequenciaAluno = function (json, callback) {
        // Converts a JavaScript Object Notation (JSON) string into an object.
        var parsedJson = JSON.parse(json);
        this.db.transaction(
            function (tx) {
                var sql = "INSERT INTO frequencia_aluno (codalu, codfrq, sitalu, assalu) VALUES (?, ?, ?, ?)";
                tx.executeSql(sql, [parsedJson.codalu, parsedJson.codfrq, parsedJson.sitalu, parsedJson.assalu], function (tx, result) {
                    // If results rows
                    callback(result.rowsAffected === 1 ? true : false);
                });
            }
        );
    };

    this.updateTrabalho = function (json, callback) {
        // Converts a JavaScript Object Notation (JSON) string into an object.
        var parsedJson = JSON.parse(json);
        this.db.transaction(
            function (tx) {
                var sql = "UPDATE trabalho SET nomtra=?, nomcur=? WHERE codtra=?";
                tx.executeSql(sql, [parsedJson.nomtra, parsedJson.nomcur, parsedJson.codtra], function (tx, result) {
                    // If results rows
                    callback(result.rowsAffected === 1 ? true : false);
                });
            }
        );
    };

    this.deleteTrabalho = function (json, callback) {
        // Converts a JavaScript Object Notation (JSON) string into an object.
        var parsedJson = JSON.parse(json);
        this.db.transaction(
            function (tx) {
                var sql = "DELETE FROM trabalho WHERE codtra=?";
                tx.executeSql(sql, [parsedJson.codtra], function (tx, result) {
                    callback(result.rowsAffected === 1 ? true : false);
                });
            }
        );
    };

    this.findAlunoAll = function (callback) {
        this.db.transaction(
            function (tx) {
                var sql = "SELECT * FROM aluno";
                tx.executeSql(sql, [], function (tx, results) {
                    var len = results.rows.length,
                        alunos = [],
                        i = 0;

                    // Semicolon at the start is to skip the initialisation of vars as we already initalise i above.
                    for (; i < len; i = i + 1) {
                        alunos[i] = results.rows.item(i);
                    }

                    // Passes a array with values back to calling function
                    callback(alunos);
                });
            },
            function (error) {
                alert("Transaction Error findAll: " + error.message);
            }
        );
    };

    this.findAllFreqAluno = function (callback) {
        this.db.transaction(
            function (tx) {
                var sql = "select fa.codfrqalu as codfrqalu, fa.assalu as assalu, fa.codalu as codalu, a.nomalu as nomalu, t.nomtra as nomtra, f.datfrq as datfrq, fa.codfrq as codfrq from frequencia_aluno fa inner join aluno a inner join frequencia f inner join trabalho t where fa.codalu = a.codalu and fa.codfrq = f.codfrq and f.codtra = t.codtra;"

                tx.executeSql(sql, [], function (tx, results) {
                    var len = results.rows.length,
                        freqAlunos = [],
                        i = 0;

                    // Semicolon at the start is to skip the initialisation of vars as we already initalise i above.
                    for (; i < len; i = i + 1) {
                        freqAlunos[i] = results.rows.item(i);
                    }

                    // Passes a array with values back to calling function
                    callback(freqAlunos);
                });
            },
            function (error) {
                alert("Transaction Error findAll frequencia_alunos: " + error.message);
            }
        );
    };

    this.findAlunoById = function (codalu, callback) {
        this.db.transaction(
            function (tx) {
                var sql = "SELECT * FROM aluno WHERE codalu=?";
                tx.executeSql(sql, [codalu], function (tx, results) {
                    // This callback returns the first results.rows.item if rows.length is 1 or return null
                    callback(results.rows.length === 1 ? results.rows.item(0) : null);
                });
            },
            function (error) {
                alert("Transaction Error: " + error.message);
            }
        );
    };

    this.insertAluno = function (json, callback) {
        // Converts a JavaScript Object Notation (JSON) string into an object.
        var parsedJson = JSON.parse(json);
        this.db.transaction(
            function (tx) {
                var sql = "INSERT INTO aluno (nomalu, nomcur, fotalu) VALUES (?, ?, ?)";
                tx.executeSql(sql, [parsedJson.nomalu, parsedJson.nomcur, parsedJson.fotalu], function (tx, result) {
                    // If results rows
                    callback(result.rowsAffected === 1 ? true : false);
                });
            }
        );
    };

    this.updateAluno = function (json, callback) {
        // Converts a JavaScript Object Notation (JSON) string into an object.
        var parsedJson = JSON.parse(json);
        this.db.transaction(
            function (tx) {
                var sql = "UPDATE aluno SET nomalu=?, nomcur=?, fotalu=? WHERE codalu=?";
                tx.executeSql(sql, [parsedJson.nomalu, parsedJson.nomcur, parsedJson.fotalu, parsedJson.codalu], function (tx, result) {
                    // If results rows
                    callback(result.rowsAffected === 1 ? true : false);
                });
            }
        );
    };

    this.deleteAluno = function (json, callback) {
        // Converts a JavaScript Object Notation (JSON) string into an object.
        var parsedJson = JSON.parse(json);
        this.db.transaction(
            function (tx) {
                var sql = "DELETE FROM aluno WHERE codalu=?";
                tx.executeSql(sql, [parsedJson.codalu], function (tx, result) {
                    callback(result.rowsAffected === 1 ? true : false);
                });
            }
        );
    };

    this.deleteFreqAluno = function (json, callback) {
        // Converts a JavaScript Object Notation (JSON) string into an object.
        var parsedJson = JSON.parse(json);
        this.db.transaction(
            function (tx) {
                var sql = "DELETE FROM frequencia_aluno WHERE codfrqalu=?";
                tx.executeSql(sql, [parsedJson.codfrqalu], function (tx, result) {
                    callback(result.rowsAffected === 1 ? true : false);
                });
            }
        );
    };

    this.deleteFrequencia = function (json, callback) {
        // Converts a JavaScript Object Notation (JSON) string into an object.
        var parsedJson = JSON.parse(json);
        this.db.transaction(
            function (tx) {
                var sql = "DELETE FROM frequencia WHERE codfrq=?";
                tx.executeSql(sql, [parsedJson.codfrq], function (tx, result) {
                    callback(result.rowsAffected === 1 ? true : false);
                });
            }
        );
    };

    // inicializando base de dados
    this.initializeDatabase(successCallback, errorCallback);
}