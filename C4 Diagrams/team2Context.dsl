workspace {
    // Model section
    model {
        user = person "Public User" "A user who views and visualizes data." "Customer"
        client = person "Client" "A client who overrides existing data." "Customer"
        authorization = softwareSystem "Authorization" "Handles client login and data access."
        dataVisualization = softwareSystem "Data Visualization Tool" "Online data visualization platform."
        database = softwareSystem "Database" "Stores user accounts and references to CSV files."
        dataAPI = softwareSystem "Data API" "Retrieves processed data from CSV files."

        user -> dataVisualization : "Visits data visualization website"
        client -> authorization : "Logs in as a client"
        authorization -> dataVisualization : "Accesses the client dashboard"
        dataVisualization -> database : "Loads client details/csv references"
        dataVisualization -> dataAPI : "Fetches processed data"
    }
    // Styles section
    views {
            styles {
                element "Person" {
                    shape person
                    color #ffffff
                    background #08427b
                    fontSize 22
                }
                element "Software System" {
                    background #438dd5
                    fontSize 22
                }
                element "Authentication" {
                    color #0000ff
                    fontSize 22
                }
                element "Database" {
                    color #ffff00
                    fontSize 22
                }
                element "Data API" {
                    color #ffa500
                    fontSize 22
                }
            }
        }
}
 