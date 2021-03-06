/***********************************************************************
 * File Name: Comments.js
 * Description: Component for the Comments section. Disqus is used to
 * host comments. 
 * Author: Symon Ramos symonr12@gmail.com
 **********************************************************************/

/* Library Imports ****************************************************/
 import React from "react";   
/**********************************************************************/

   
/**********************************************************************
 * Function Name: Comments
 * Parameters: None
 * Description: Component for Comments.
 * Notes: None
 **********************************************************************/
function Comments() {
    /*
    var disqus_config = function () {
    this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    */

    //This code was from Disqus to render the document.
    (function() {
    var d = document, s = d.createElement('script');
    s.src = 'https://blog-app-3.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    })();
    
    return (
        <div>
            <div id="disqus_thread"></div>
            <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
        </div>
    );
}

export default Comments;
                