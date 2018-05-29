const json = `{
  "firstname":"Adminy",
  "mail":"adminy.mcadminface@fial.com.au",
  "Employer":[
     {
        "Company":[
           {
              "name":"Fial Test",
              "id": 123
           }
        ],
        "role":"Account",
        "department":"Finance"
     }
  ],
  "telmobile":"021 345 678",
  "id":8487645,
  "fullname":"Adminy McAdminface",
  "lastname":"McAdminface"
}`

module.exports = JSON.parse(json)
