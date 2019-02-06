
// console.log( findThreesInArray([1,2,4,5,6,7,8,3,3,4,2,1,2]) )
// console.log( findThreesInArray([]) )
// console.log( findThreesInArray([1,2,4,5,6,7,8,3,3,4,2,1,2],"test") )

function findThreesInArray(arr) {

    var ans = []
    if( Array.isArray(arr) || arguments.length === 1 )
    {
        arr.forEach(element => {
          if( element == 3 )
            ans.push(pow(element))
        });
    }
    return ans;
}

function pow(num)
{
    return num*num; 
}


var CollectionUtil = {}

CollectionUtil.forEach = function(collection, callback) {


    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        callback(element, array, i)
        
    }
}

CollectionUtil.filter   = function(collection, callback) {
    let temp = []
    for (let index = 0; index < collection.length; index++) {
        const element = collection[index];
        if(callback(element))
            temp.push(element)
    }

    return temp;
}

CollectionUtil.map  = function(collection, callback) {
    let temp = [];
    for (let index = 0; collection < array.length; index++) {
        const element = arrcollectionay[index];
        temp.push(callback(element))        
    }
    return temp
}

var arr = [0,1,2,3,4,5,6,7,8,9]

var ans = CollectionUtil.filter( arr, (m) => {
    return m < 5
})
console.log(ans)