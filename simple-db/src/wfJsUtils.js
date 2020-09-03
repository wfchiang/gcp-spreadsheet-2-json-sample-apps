export const isUndefined = function (v) {
    return (typeof v === 'undefined'); 
};

export const isString = function (v) {
    return (typeof v === 'string');
}; 

export const isObject = function (v) {
    return ((typeof v === 'object') && (v.constructor === Object));
};

export const isArray = function (v) {
    return ((typeof v === 'object') && (v.constructor === Array)); 
}; 
