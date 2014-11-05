Meteor.methods({
    SaveTranslated : function (post){
        
        return Posts.insert(post);
         //postId ;
    }
    
});