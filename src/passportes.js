passport.use(new PassportLocal (function (username, password, done){
    if(username ==="dick" && password==="123"){
        return done(null,{id: 1, name: "cody"})
    }
    done(null,false)
}))

passport.serializeUser(function(user, done){
    done(null, user.id)
})

passport.deserializeUser(function(id,done){
    done(null,{id: 1, name: "cody"});
})
