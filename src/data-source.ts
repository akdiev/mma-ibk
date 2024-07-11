import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "aki",
    password: "test123",
    database: "aki_mma-ibk",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})

// export function dbInit() {
//     var dataSource = new typeorm.DataSource({
//         type: "mysql",
//         host: "localhost",
//         port: 3306,
//         username: "aki",
//         password: "test123",
//         database: "aki_mma-ibk",
//         synchronize: true,
//         entities: [require("./entities/User")],
//     })

//     dataSource
//         .initialize()
//         .then(function () {
//             var user = {
//                 name: "John Doe",
//                 email: "john@doe.com",
//                 password: "123456"
//             }

//             var postRepository = dataSource.getRepository("User")
//             postRepository
//                 .save(user)
//                 .then(function (user) {
//                     console.log("User has been saved: ", user)
//                     console.log("Now lets load all users: ")

//                     return postRepository.find()
//                 })
//                 .then(function (allUsers) {
//                     console.log("All posts: ", allUsers)
//                 })
//         })
//         .catch(function (error) {
//             console.log("Error: ", error)
//         })
// }