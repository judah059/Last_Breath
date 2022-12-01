export const convertSubPlanName = (type: string) => {
    if(!type){
        return 'None'
    }

    return type === 'ST' ? 'Standard' : 'Premium'
}