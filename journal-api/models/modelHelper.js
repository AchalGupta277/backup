/** basemodel will be inherited by all other models */
const underscore = require("underscore");

const constant = require("../../../core/constant.js");
const database = require(constant.path.app + "core/database.js");

export class ModelHelper {
    databaseObj;

    constructor() {
        this.databaseObj = new database().getInstance();
    }

    /**
     * 
     * @table :String
     * @params = {
     *  orderBy : String,
     *  limit : String,
     *  fields : String
     * }
     * @conditions
     * conditions["city_id"]= {sign:"=",value:request["cityId"]};
     * conditions["city_pincode_minimum_value"]={sign:">",value:0};
     */

    async sqlSelect(table, conditions = {}, params = {}) {
        let queryValues = [];

        /** use * if no field is provided */
        params.fields = params.fields || "*";

        let sql = `
            SELECT 
                ${params.fields}
            FROM 
                ${table} `;

        if (false === underscore.isEmpty(conditions)) {
            sql += ` WHERE `;
            underscore.each(conditions, function (value, index) {
                let valIndex = queryValues.length + 1;
                if (underscore.isEmpty(queryValues) === false) {
                    sql += ` AND`
                }
                if (underscore.isArray(value)) {
                    // example: id: { sign: '>', value: 2}    id > 2
                    sql += ` ${index} = ANY ($${valIndex}) `;
                    queryValues.push(value);
                } else if (underscore.isObject(value)) {
                    // example: id: [1,2,3,4]  id in (1,2,3,4)
                    sql += ` ${index} ${value.sign} $${valIndex} `;
                    queryValues.push(value.value);
                } else {
                    // example: id: 0    id = 0
                    sql += ` ${index} = $${valIndex} `;
                    queryValues.push(value);
                }
            });
        }

        //Adding  Order By if exist
        sql += params.orderBy ? `ORDER BY ${params.orderBy} ` : "";

        //Adding Limit
        sql += params.limit ? `LIMIT ${params.limit}` : "";

        sql += params.offset ? `OFFSET ${params.offset}` : "";

        let queryRes = await this.promiseQuery(sql, queryValues);
        return (queryRes && queryRes.rows) || []
    }

    // /*
    // * @description Generic Insert for postgreSql
    // * 
    // * @example 
    // let data = {
    //     'id': 2,
    //     'email': abc@gmail.com,
    // };

    // model.postgreSqlInsert('users', data, function (err, results) {
    //     //Do something with result and error
    // });

    // #Query
    // Insert into users SET id = 2, email=abc@gmail.com
    // */

    async sqlInsert(table, data = {}) {

        let colString = `(${Object.keys(data).join(',')}) `;

        let val = Object.values(data).map((item, index) => `$${index + 1}`);
        let valString = `(${val.join(',')}) `;
        let sql = `
            INSERT INTO ${table} ${colString}
            VALUES ${valString}
        `;
        return this.promiseQuery(sql, Object.values(data));
    }

    // /*
    // * @description Generic Insert for postgreSql
    // * 
    // * @example 
    // let data = [{
    //     'id': 1,
    //     'email': abc@gmail.com,
    // },
    // {
    //     'id': 2,
    //     'email': def@gmail.com,
    // }]

    // model.postgreSqlInsert('users', data, function (err, results) {
    //     //Do something with result and error
    // });

    // #Query
    // Insert into users SET id = 2, email=abc@gmail.com
    // */

    async sqlBulkInsert(table, data = []) {
        let colString = `(${Object.keys(data[0]).join(',')}) `;
        let valArr = [];
        let valString = ``;
        let counter = 1;
        let dataArr = data.map((item) => {
            valString += valString.length ? `, (` : `(`;
            Object.values(item).map((innerItem, index) => {
                valString += index ? `, $${counter++}` : `$${counter++}`;
                valArr.push(innerItem);
            })
            valString += `)`;
        })
        let val = Object.values(data).map((item, index) => `$${index + 1}`);

        let sql = `
            INSERT INTO ${table}${colString}
            VALUES ${valString}
        `;
        return this.promiseQuery(sql, valArr);
    }

    // /**
    //  * supports only = condition
    //  * 
    //  * @param table :string 
    //  * @param data 
    //  * data = {
    //  *  firstName: 'Achal'
    //  *  lastName: 'Gupta' 
    //  * }
    //  * @param conditions
    //  * conditions ={
    //  *  status : 1,
    //  *  id : 2
    //  * } 
    //  */
    async sqlUpdate(table, data = {}, conditions = {}) {
        let queryValues = [];
        let valString = ``;
        let conditionString = ``;

        if (underscore.isEmpty(conditions) === true) {
            throw new Error('UpdateConditionsNotFoundException');
        }
        let counter = 1;
        for (let key in data) {
            valString += valString.length ? `, ${key} = $${counter++}` : ` SET ${key} = $${counter++}`;
            queryValues.push(data[key]);
        }
        for (let key in conditions) {
            conditionString += conditionString.length ? ` AND ${key} = $${counter++}` : ` WHERE ${key} = $${counter++}`;
            queryValues.push(conditions[key]);
        }

        let sql = `UPDATE ${table} ${valString} ${conditionString}`;

        return this.promiseQuery(sql, queryValues);
    }

    async executeRawQuery(query, values) {
        return this.promiseQuery(query, values);
    }

    promiseQuery(query, values) {
        return new Promise((resolve, reject) => {
            this.databaseObj.query(query, values, function (error, results) {
                if (error) {
                    reject(error.message);
                }
                resolve(results);
            });
        });
    }
}
