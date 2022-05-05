const db = require('./connection');
const { Prompt, Story, Comment, User } = require('../models');

db.once('open', async () => {
    await Prompt.deleteManny();

    const prompts = await Prompt.insertMany([
        { prompt: 'Go for a walk. Observe your surroundings and write about what you see.' },
        { prompt: 'Write about a song and a feeling it invoked in you.' },
        { prompt: 'Think about a movie that you did not like and try to explain the plot objectively.' },
        { prompt: 'If you could live inside one of your favorite stories, what would you change about it?' },
        { prompt: 'Describe your favorite location.' },
        { prompt: 'In 10 years from now, what historical event from this past year do you think they will be talking about?' },
        { prompt: 'Write about why you enjoy writing.' },
        { prompt: 'Tell a story about one of your fondest childhood memories.' },
    ]);
    console.log('prompts have been seeded');

    await Story.deleteMany();

    const stories = await Story.insertMany([
        {
            storyText: 'There are perks to living in an aging community. Every property is a museum if you look right. This is especially true in the northwoods where the pines conceal sprawling troves of aging dreamers. I’ve been tending to the property of a friend of mine while he is away. 50 years he and his wife have been accumulating. Accumulating cars, construction materials, bicycles, lawn ornaments, bells, buildings, folk art and when he could not find any more space for the things, he bought more space. Plot by plot, year by year, skill after skill he gained and with them so many dreams. They left for Georgia to assist one of their daughters with her property. Two weeks they said they would be gone. They are pushing a year now. I was there to make sure the snow didn’t collapse the tents they built to protect the latest batch of stuff they have claimed and to keep their two cats, Molly and Cougar, fed. The snow spreads and bunches in tons here, concealing the piles of objects in a thick white shawl. It is only now, in spring where the snow has finally vanished that I can see the property and the stories and mysteries that lie concealed. Now, I walk unhindered, indulging my curiosity. Through the twisting, overgrown paths, I pass various small buildings in different states of disrepair. Each one of them bursting and spilling out all kinds of clutter in the process of being retaken by nature. Collapsed roofs, moss, shattered glass, hastily nailed plywood was the palette of these buildings. More set dressing for the end of the world than a couples home. One building stood out to me however. A salmon pink bungalow you may see on a lake resort or camp. Unlike its peers, the roof was intact, paint unfaded, steady and sturdy. I wa instantly enchanted by this little place. I imagined scooping it and placing it at the mouth of an unknown lake. I’d fill it with a little desk and chair, easily found on the estate of its origin. A small bed would descend from the ceiling to conserve space. A generator, latrine, water filtration and I could live wonderfully in this little salmon place as one of the concealed treasures of the woods myself. This little thing sparked a lust for solitude I had maybe let go of for sometime. Of course, upon opening the door to the charming little stead, I was greeted by a floor to ceiling stack of camping cots, pads, stools, chairs and all the more manner of refreshingly well preserved free ephemera. I planned my bushman life for maybe ten minutes before I felt a brush at my ankles. Cougar and Molly had decided to be my guides for the rest of my walk. The cats in tow, I kept wandering. Passed a coat rack filled still brimming with coats, half sheltered from the elements. The coats undercover were elaborate and colorful, while the exposed one looked like they were shredded by beasts. How much time had passed to see that kind of wear? How many rains and droughts had those coats seen? Along the path, past the 50 bicycles stacked against a wall, I found something truly mysterious. Sunken into the grass, flanked by the expected smattering of detritus, was a sealed glass jug containing a gallon of unknowable amber liquid. What was it? How long was it there? The only investigation I dared give was a nuge with my foot. It wiggled like greasy water. So far my best guesses of what it could be are either the final step down of whatever it started as into a pure and primordial ooze, or the first step toward maple syrup. I lacked the courage to pop the top and see. To give context for how long some of these things could have been here, I found a juice bottle filled with water, presumably by a friend who intended on bringing it with on a walk through the trails. I picked up the bottle and learned the juice it once contained would have expired seven years ago. Cars melting into the earth, buses with designs now long unrecognizable, construction projects half finished, more dock sections than lake. I wander and ponder about how fleeting dreams can be, but how sturdy the desire to create truly is. To me, this place is a testament to it. My neighbors’ auto-biography. Every pile of wayward skis and stack of window panes, another paragraph, every bus another page and every building another chapter. On the walks I have taken this spring, I feel I have learned more about them now than I ever have. I wonder what I will leave behind one day that will carve my record into the rock',
            author: 'Jesse Pangerl',
            // createdAt: '',
    
        },
        {
            // add more stories
        },
    ]);
    console.log('stories have been seeded');

    await User.deleteMany();

    await User.create({
        username: 'Jesse Pangerl',
        email: 'jesse.pangrel@email.com',
        password: 'jespan!22',
        stories: [
            { 
                stories: []
            }
        ]
    });
    await User.create({
        username: 'ADMIN',
        email: 'ADMIN@ADMIN.COM',
        password: 'ADMIN123',
        isAdmin: true
    })
    /* add another user
    await User.create({
        username: 'ElevatorPitchCam',
        email: 'elevator.pitch101@campitch.com',
        password: '',
        stories: [
            { 
                stories: []
            }
        ]
    });
    */
    console.log('users have been seeded');

    // stop seeding
    process.exit();
});