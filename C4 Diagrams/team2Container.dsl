workspace {
    // Model section
    model {
        user = person "Public User" "A user who views and visualizes data." "Customer"
        
         datavisualisationSystem = softwaresystem "DataVisualisationSystem" "Allows users to view the data visualised." {
            singlePageApplication = container "Single-Page Application" "Provides the data visualisation functionality to the user via their web browser." 
            mobileApp = container "Mobile App" "Provides the data visualisation functionality to customers via their mobile device." 
            webApplication = container "Web Application" "Delivers the data visualisation tool." 
            apiApplication = container "API Application" "Provides the processed data via a JSON/HTTPS API." 
            database = container "Database" "Stores user registration information and references to the data csv files." 
       
            user -> webApplication : "Visits the data visualization website using https"
            user -> singlePageApplication : "Views the data visualization using"
            user -> mobileApp : "Views the data visualization using"
            webApplication -> singlePageApplication : "Delivers to the customer's web browser"
            singlePageApplication -> apiApplication : "Makes API calls to JSON/HTTP"
            mobileApp -> apiApplication : "Makes API calls to JSON/HTTP"
            apiApplication -> database : "Reads from and writes to SQL/TCP"
        }
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
            }
        }
}
 