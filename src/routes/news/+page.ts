//@ts-nocheck

export const load: PageLoad = async ({ fetch }) => {

    const nflRes = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/news')


    const nflNews = await nflRes.json()

    return nflNews
}
