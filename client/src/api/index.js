import axios from "axios"

export const getLikesOnPost = (shortcode, after = '', first = 50) => {
    return axios.get('https://www.instagram.com/graphql/query/', {
        params: {
            query_id: 17864450716183058,
            shortcode: shortcode,
            first: first,
            after: after
        }
    })
}

export const getUserInfo = (username) => {
    return axios.get(`https://www.instagram.com/${username}`, {
        params: {
            __a: 1
        }
    })
}

export const searchByQuery = (query) => {
    return axios.get('https://www.instagram.com/web/search/topsearch/', {
        params: {
            query: query
        }
    })
}
