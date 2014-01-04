
// ham hien thi post, comment

function getGroupWall(start,end) {
    var graphQuery = '/241619362662034/?fields=feed.limit(10000)';
    var authToken = "560878127334436|ZXAlCISJfs2YgbsqNkb2sMNbMT4";
    var url = graphQuery + '&access_token=' + authToken;
    
    FB.api(url, 'get', function (response) {
        for (i = start, j = response.feed.data.length; i < end ; i++) {
            if (response.feed.data[i].message || response.feed.data[i].description) {
                $(".postHolder").append("<a target='_blank' href='https:///facebook.com/" + response.feed.data[i].from.id + "'> <img data-bind='attr: { src: PostedByAvatar }' src='http:///graph.facebook.com/" + response.feed.data[i].from.id + '/picture' + "'/></a><p><a  target='_blank' href='https:///facebook.com/" + response.feed.data[i].from.id + "' data-bind='text: PostedByName'> " + response.feed.data[i].from.name + " </a>: <span data_bind= 'html: Message' > " + response.feed.data[i].message + " </pan></p>");

            }
            
            $(".postHolder").append("<div class='postFooter'>");
            if (response.feed.data[i].likes) {
                $(".postHolder").append("<a class='linkComment'  data-bind=' click: toggleComment'>" + response.feed.data[i].likes.data.length + " Likes  </a>&nbsp;<a class='linkComment'  data-bind=' click: toggleComment'>Comment  </a> ");
            }
            else {
                $(".postHolder").append("<a class='linkComment'  data-bind=' click: toggleComment'>0 Like  </a>&nbsp;<a class='linkComment'  data-bind=' click: toggleComment'>Comment  </a> ");
            }
            $(".postHolder").append("<div class='commentSection'>");
            $(".postHolder").append("<ul data-bind='foreach: PostComments'>");
           
            if (response.feed.data[i].comments) {
                if (response.feed.data[i].comments.data.length <= 5) {
                    for (k = 0; k < response.feed.data[i].comments.data.length ; k++) {
                        $(".postHolder").append(" <li class='commentHolder'>");
                        $(".postHolder").append("<a target='_blank' href='https:///facebook.com/" + response.feed.data[i].comments.data[k].from.id + "'><img data-bind = 'attr : { src: CommentedByAvatar }' src='http:///graph.facebook.com/" + response.feed.data[i].comments.data[k].from.id + '/picture' + "'></a><p> <a  target='_blank' href='https:///facebook.com/" + response.feed.data[i].comments.data[k].from.id + "' data-bind = ' text: CommentedByName' >" + response.feed.data[i].comments.data[k].from.name + " </a>: <span data-bind = 'html : Message' > " + response.feed.data[i].comments.data[k].message + "  </span></p>");
                        $(".postHolder").append("</li>");
                    }
                }
                else {
                    for (k = 0; k < 5 ; k++) {
                        $(".postHolder").append(" <li class='commentHolder'>");
                        $(".postHolder").append("<a target='_blank' href='https:///facebook.com/" + response.feed.data[i].comments.data[k].from.id + "'><img data-bind = 'attr : { src: CommentedByAvatar }' src='http:///graph.facebook.com/" + response.feed.data[i].comments.data[k].from.id + '/picture' + "'></a><p> <a  target='_blank' href='https:///facebook.com/" + response.feed.data[i].comments.data[k].from.id + "' data-bind = ' text: CommentedByName' >" + response.feed.data[i].comments.data[k].from.name + " </a>: <span data-bind = 'html : Message' > " + response.feed.data[i].comments.data[k].message + "  </span></p>");
                        $(".postHolder").append("</li>");
                    }
                    $(".postHolder").append(" <div id='name" + i + "' >");
                    $(".postHolder").append("</div>");

                    $(".postHolder").append(" <li class='commentHolder'>");
                    $(".postHolder").append("<div  id='CMV" + i + "'><a onclick='getcomment(" + i + ")' class='linkComment'  data-bind=' click: toggleComment'>View More Comment </a></div>");
                    $(".postHolder").append("</li>");
                }
            }
   
            $(".postHolder").append("</ul>");

            $(".postHolder").append(" <div style='display: block' class='publishComment'>");
            $(".postHolder").append("<textarea class= 'commentTextArea' data-bind = 'value: newCommnetMessage,jqAutoresize: {}' placeholder='write a comment...' style = ' height: 19px; overflow: hidden; word-wrap: break-word; resize: more;'></textarea> ");
           
            $(".postHolder").append("<input type= 'button' value ='Comment' class='btnComment' data-bind='click : addComment'");

            $(".postHolder").append("</div></div></div> <br /><br /> <br /> <br /> <br />");
           
        }
        loading = false;
        $(".loading").remove();
    });

    //var id1 = document.getElementById('HCMUSFIT');
    //id1.parentNode.removeChild(id1);
}



function getcomment(a)
{
    var graphQuery = '/241619362662034/?fields=feed.limit(10000)';
    //var authToken = FB.getAuthResponse()['accessToken'];
    var authToken = "560878127334436|ZXAlCISJfs2YgbsqNkb2sMNbMT4";
    var url = graphQuery + '&access_token=' + authToken;

    FB.api(url, 'get', function (response) {

        for (k = 5; k < response.feed.data[a].comments.data.length ; k++) {
            $("#name" + a + "").append(" <li class='commentHolder'>");
            $("#name" + a + "").append("<a href='https:///facebook.com/" + response.feed.data[a].comments.data[k].from.id + "'><img data-bind = 'attr : { src: CommentedByAvatar }' src='http:///graph.facebook.com/" + response.feed.data[a].comments.data[k].from.id + '/picture' + "'></a><p> <a  target='_blank' href='https:///facebook.com/" + response.feed.data[a].comments.data[k].from.id + "' data-bind = ' text: CommentedByName' >" + response.feed.data[a].comments.data[k].from.name + " </a>: <span data-bind = 'html : Message' > " + response.feed.data[a].comments.data[k].message + "  </span></p>");
            $("#name" + a + "").append("</li>");
        }

    });

    var id = document.getElementById('CMV'+a);
    id.parentNode.removeChild(id);

}

function scroll()
{
    getGroupWall();
   
    $(".postHolder").scroll(function()
    {
        var curscroll = $(this)[0].scrollTop;
        var maxscroll = $(this)[0].scrollHeight - $(this).height();
        
        if ((curscroll >= maxscroll -400) && loading == false)
        {
            loading = true;
            $(".postHolder").append("<div class='loading'>Loading...</div>");
            $(this)[0].scrollTop = $(this)[0].scrollHeight - $(this).height();
            getGroupWal();
        }


    });
}