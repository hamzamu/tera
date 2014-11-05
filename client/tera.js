var SaveTimer = function(){
    var timer;
    
    this.set = function(saveAutoForm){
        timer = Meteor.setTimeout(function(){
            saveAutoForm();  
        }, 3000 )
    };
    
    this.clear = function(){
        Meteor.clearInterval(timer);
    };
    
    return this ;    

};


Template.terForm.events({
    'input #Translate' : function (e , t ){
        Session.set('saving' , 'Saving......');
        
       // SaveTimer.clear();
        var post = $('#Translate').val();
        
        Meteor.setTimeout(function(){
             //Posts.insert({post:post});
            var postReady = {post:post};
            var postExist = Session.get('postId');
            if (!postExist)
                Meteor.call('SaveTranslated' , postReady , function(err , postId){
                Session.set('postId', postId);
                });
            else
                Posts.update(postExist ,{$set:{post:post}});
            Session.set('saving', ' saved ' );
        },10)
       
    }
    
});

Template.terForm.helpers({
    saved : function(){
        return Session.get('saving');
    },
    post : function (){
        return Posts.findOne(Session.get('postId'));
    }
});