export type FeaturedImage = {
    node: {
        databaseId: number
    }
}
export interface Card {
    ctaText?: string,
    featuredImage?: {
        node: {
            databaseId : number
        }
    },
    title : string, 
    link : string, 
    kicker? : string, 
    desc? : string,  
    externalLink? : boolean, 
    extraClasses? : string, 
    styleMod? : "slim"
}
export interface MenuItem {
    id:number,
    url:string,
    label:string
}