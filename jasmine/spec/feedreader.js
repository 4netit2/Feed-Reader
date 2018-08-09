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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This it tests to make sure that the
         * allFeeds variable has been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();          //check if allFeeds array is defined
            expect(allFeeds.length).not.toBe(0);     //check if array contains something
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it ('test if has an URL', function() {
            for (var check of allFeeds) {
                expect(check.url).toBeDefined();        //for each feed we expect that url to be defined
                expect(check.url.length).not.toBe(0);   //check that url is not empty
            }
        });

        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it ('test if a name exists', function() {
            for (var check of allFeeds) {
                expect(check.name).toBeDefined();        //for each feed we expect that a name to be defined
                expect(check.name.length).not.toBe(0);   //check if the name is not empty
            }
        });

    });


        /* This write a test named "The menu" that ensures the menu element is
         * hidden by default.
         * We'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        describe('The menu', function() {
            it('hidden menu', function () {
                expect($('body').hasClass('menu-hidden')).toBe(true);  //check if the menu is hidden by default if has a class
            });



         /* We will test that the menu changes visibility when the menu icon is clicked.
          * This test should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

            it('changes visibility when menu icon is clicked', function() {
                $('.menu-icon-link').click();
                     expect($('body').hasClass('menu-hidden')).toBe(false);

                $('.menu-icon-link').click();
                     expect($('body').hasClass('menu-hidden')).toBe(true);   //when clicked expect menu to hide
    });



         /* We'll write a test named "Initial Entries" that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        describe('Initial Entries', function() {


            beforeEach(function(done) {
                loadFeed(0, () => {
                    done();
                });
            });

            it('there is at least a single .entry element within the .feed container', function() {
                 expect($('.feed .entry').length).not.toBe(0);   //check if each entry has length
                });
        });



         /* We'll write a test named "New Feed Selection" that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        describe('New Feed Selection', () => {

          var oldFeed, newFeed;  //create two feeds for testing changes

          beforeEach(function(done) {
              loadFeed(0, function() {
                  oldFeed = document.querySelector('.feed').innerHTML;
              loadFeed(1, function() {
                  newFeed = document.querySelector('.feed').innerHTML;
              done();
                });
              });
          });
      
          it('if the content is changing', function (done){
              expect(oldFeed).not.toBe(newFeed);    
              done();
          });

        });
    }); 
}());
