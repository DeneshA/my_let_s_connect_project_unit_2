const db = require('../db')
const { Address } = require('../models')

const main = async () => {

    const addresses = [
        {
            type: "House",
            unit_no: "82",
            street_name_1: "Perterson Road",
            street_name_2: "",
            city: "Brampton",
            province:"Ontario",
            country:"Canada",
            country_code:"CA",
            postal_code:"L6Y-0T9"
        },
        {
            type: "House",
            unit_no: "45",
            street_name_1: "Littet Ilford Lane",
            street_name_2: "",
            city: "Markham",
            province:"Ontario",
            country:"Canada",
            country_code:"CA",
            postal_code:"M6R-0T9"
        },
        {
            type: "Party Hall",
            unit_no: "5500",
            street_name_1: "Finacial Road",
            street_name_2: "",
            city: "Waterloo",
            province:"Ontario",
            country:"Canada",
            country_code:"CA",
            postal_code:"W6P-8T6"
        }
    ]
    await Address.insertMany(addresses)
    console.log("Suceaafully added Addresses !")
}

const run = async () => {
    await main()
    db.close()
}

run()