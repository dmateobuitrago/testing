/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
        // Tests that the allFeeds variable has been defined and that it is not empty. 
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


       //Test that each feed has a URL
        it('has a defined URL', function(){
            allFeeds.forEach(function(item){
                expect(item.url).toBeDefined();
                expect(item.url.length).not.toBe(0);
            });
        });


        //Test that each feed has a name
        it('has a defined name', function(){
        for(var i = 0; i < allFeeds.length; i++){
            expect(allFeeds[i].name).toBeDefined();
            expect(allFeeds[i].name.length).not.toBe(0);
        }
        });

    });

    
    describe('The menu', function(){
        var $body,
            hasClass,
            $menuIcon;
        
        beforeEach(function(){
            $body = $('body'),
            hasClass = $body.hasClass('menu-hidden');
        });
        
        //Test that the menu is hidden by default
        it('is hidden by default', function(){
            expect(hasClass).toBeTruthy();
        });
        
        //Test that the menu toggles the visibility
        it('changes visibility when the menu icon is clicked', function(){
            $menuIcon = $('.menu-icon-link');
            // click to display menu
            $menuIcon.trigger("click");
            hasClass = $body.hasClass('menu-hidden');
            expect(hasClass).toBeFalsy();
            // click to hide menu
            $menuIcon.trigger("click");
            hasClass = $body.hasClass('menu-hidden');
            expect(hasClass).toBeTruthy();
        });
        
        
    });
    
    describe('Initial entries', function(){
        // test that the loadFeed function actually loads content
        var $entry;
        
        beforeEach(function(done){
            loadFeed(0, function(){
                $entry = $('.feed .entry');
                done();
            });
        });
        
        it('loads at least a single .entry element within the .feed container', function(){
            expect($entry.length).toBeGreaterThan(0);
        });
        
    });
    
    describe('New Feed Selection', function(){
        // test that when the loadFeed loads content from a different
        // feed, the content actually changes
        var $oldFeed,
            $newFeed;
        beforeEach(function(done){
            loadFeed(1, function(){
                $oldFeed = $('.feed').html();
                loadFeed(2, function(){
                    $newFeed = $('.feed').html();   
                    done();
                });
            });
        });
        
        it('the content actually changes', function(done){
            expect($oldFeed != $newFeed).toBeTruthy();
            done();
        });
        
    });
    
}());
