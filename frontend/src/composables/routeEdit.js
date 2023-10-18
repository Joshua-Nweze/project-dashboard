export function routeEdit() {
    function routeRemoveDash (routeParam) {
        return (routeParam.value.split('-').join(' ').toLowerCase())
    }
        return { routeRemoveDash }
}