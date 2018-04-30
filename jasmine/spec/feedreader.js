/* feedreader.js
 *
 * this is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {

	/* First Test Suite */
	describe('RSS Feeds', function() {
		/* this is our first RSS Feeds test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty.
		 */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		// this is our second RSS feeds test - it tests to make sure that the
		// URL property exists inside the element object, and is not empty.
		 it('should have a URL defined and not be empty', function() {
			allFeeds.forEach(function(element) {
				expect(element.url).toBeDefined();
				expect(element.url.length).not.toBe(0);
			});
		 });


		// this is our third RSS Feeds test - similar to the previous test, it // checks to make sure that the name property
		 it('should have a name defined and not be empty', function() {
			allFeeds.forEach(function(element) {
				expect(element.name).toBeDefined();
				expect(element.name.length).not.toBe(0);
			});
		 });
	});

	/* Second Test Suite: The Menu */
	describe('The Menu', function() {

		 // this is our first The Menu test - it ensures the menu element is // hidden by default when the page loads.
		 it('should be hidden by default', function() {
			expect(document.body.classList.contains('menu-hidden')).toBe(true);
		 });

		  // this is our second The Menu test - it tests to make sure the
		  // menu changes its visibility when toggle is clicked.
		  it('should change visibly when icon clicked', function() {
			var menuIcon = document.querySelector('.menu-icon-link');

			menuIcon.click();
			expect(document.body.classList.contains('menu-hidden')).toBe(false);
			menuIcon.click();
			expect(document.body.classList.contains('menu-hidden')).toBe(true);
		  });

	});

	/* Third Test Suite: Initial Entries */
	describe('Initial Entries', function() {

		 // this is our first Initial Entries test - it ensures that when
		 // loadFeed is called, and complets, that at least a single entry
		 // element is loaded into the feed container.
		 var feedContainer;

		 beforeEach(function(done) {
		 	loadFeed(0, done);
		 	feedContainer = document.querySelector('.feed');
		 });

		 // this spec will not start until the done() passed in as a callback in the beforeEach
		 // has been called.
		 it('should have at least a single .entry element within the .feed container', function(done) {
		 	var entries = feedContainer.querySelectorAll('.entry-link');
		 	expect(entries.length).not.toBe(0);
		 	done();
		 });
	});

	/* Fourth Test Suite: New Feed Selection */
	describe('New Feed Selection', function() {

		 // this is the first New Feed Selection test - it checks to
		 // make sure that when a new loadFeed is fired with a new feed
		 // that the content actually changes.
		 var originalFeed;
		 var newFeed;

		 beforeAll(function(done) {
		 	// this function has access to originalFeed because it's a closure
		 	loadFeed(0, function() {
		 		originalFeed = document.querySelector('.feed').innerHTML;
		 		done();
		 	});
		 });

		 beforeEach(function(done) {
		 	// this function has access to newFeed because it's a closure
		 	loadFeed(1, function() {
		 		newFeed = document.querySelector('.feed').innerHTML;
		 		done();
		 	});
		 });

		 it('should update the content when a new request is made', function(done) {
		 	expect(newFeed).not.toBe(originalFeed);
		 	done();
		 });
	});
}());
