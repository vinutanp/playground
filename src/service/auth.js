const sessionIdmap=new Map();

export function setUser(id, user){
    return sessionIdmap.set(id, user);
}

export function getuser(id){
    return sessionIdmap.get(id)
}