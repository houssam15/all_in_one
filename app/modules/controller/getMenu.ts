import { getMenu as getMenuData} from "@/app/modules/database/data";

export default async function getMenu(){
    try{
        return await getMenuData();
    }catch(err){
       return -1;
    }
}
