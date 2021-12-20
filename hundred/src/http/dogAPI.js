import {$host} from "./index";

export const fetchRecordDog = async () => {
    const {data} = await $host.get('api/records/all')
    return data
}




export const fetchSearchTitle = async (title) => {
    const {data} = await $host.get('api/records/search/' + title)
    return data
}

export const fetchSelectBreed = async (breed) => {
    const {data} = await $host.get('api/records/breed/' + breed)
    return data
}

