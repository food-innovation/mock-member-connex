const json = `{
  "firstname":"Testy",
  "mail":"testy.mctestface@test.tes",
  "Employer":[
     {
        "Company":[
           {
              "Group":[
                 {
                    "name":"Business - Small",
                    "type":"Stakeholder Type"
                 }
              ],
              "name":"TestyCorp Pty Ltd"
           }
        ],
        "role":"Account",
        "department":"Finance"
     },
     {
        "Company":[
           {
              "Group":[
                 {
                    "name":"Business - Small",
                    "type":"Stakeholder Type"
                 },
                 {
                    "name":"Network / Association",
                    "type":"Stakeholder Type"
                 }
              ],
              "name":"National Union of Test Services"
           }
        ],
        "role":"Engineer",
        "department":"Business Development"
     }
  ],
  "telmobile":"021 345 678",
  "id":13616,
  "fullname":"Testy McTestface",
  "lastname":"McTestface",
  "PersonGroupRel":[
     {
        "PersonGroup":[
           {
              "name":"FIAL Newsletter",
              "type":"Mailing List"
           }
        ]
     },
     {
        "PersonGroup":[
           {
              "name":"Dairy",
              "type":"Categories of Interest"
           }
        ]
     },
     {
        "PersonGroup":[
           {
              "name":"Seafood (fresh/processed)",
              "type":"Categories of Interest"
           }
        ]
     },
     {
        "PersonGroup":[
           {
              "name":"China",
              "type":"Markets of Interest"
           }
        ]
     },
     {
        "PersonGroup":[
           {
              "name":"Japan",
              "type":"Markets of Interest"
           }
        ]
     },
     {
        "PersonGroup":[
           {
              "name":"South Korea",
              "type":"Markets of Interest"
           }
        ]
     }
  ]
}`

module.exports = JSON.parse(json)
