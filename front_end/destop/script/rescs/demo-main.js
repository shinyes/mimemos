import { create_rescs } from "./project_specific_mods/rescs/rescs.mjs"

let file_input = document.querySelector('#file-input')

let rescs = create_rescs(file_input)

let btm = document.querySelector("#btm")
let conatiner = document.querySelector("#container")
conatiner.insertBefore(rescs, btm)