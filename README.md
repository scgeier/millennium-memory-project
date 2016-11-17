# millennium-memory-project

This past summer, I reached out to more than 200 people in a nationwide online survey that began with a simple question: "Do you remember where you were on New Year's Eve, 1999?" I also grabbed a microphone and hit the streets, talking to people from all walks of life about their thoughts and memories from the turn of the millennium. The result was a fascinating study of collective memory, technology, and cultural shifts. It became my master's thesis project at the School of Media and Journalism at University of North Carolina at Chapel Hill.

I built this <a href="http://www.millenniummemory.com" target="_blank">website</a> as the platform for my research results. The site combines data visualization with audio interviews and a longform article. I used D3.js and AngularJS for most of the front-end web development, and various pieces of Adobe Creative Cloud software (Illustrator, Audition and Premier Pro) for the graphics and audio/video content. To create the cartoon SVGs, I pasted blocks of code from Illustrator, rather than using img tags, so that I could interact with individual paths in the DOM. I used vanilla Javascript whenever possible to keep the site lightweight.

I wanted the site to have a magazine aesthetic, with text wraps around the charts and cartoons, rather than the boxy look of a standard website. This meant that I couldn't rely solely on Boostrap for responsive design and breakpoints. I also had to customize the responsive SVG canvases for the D3 charts so they kept the magazine style on desktop.


Cheers,

Scott Geier