const db = require('./connection');
const { Comment, Story, User } = require('../models');

db.once('open', async () => {
    await Story.deleteManny();

    const stories = await Story.insertMany([
        { prompt: 'Go for a walk. Observe your surroundings and write about what you see.' },
        { prompt: 'Write about a song and a feeling it invoked in you.' },
        { prompt: 'Think about a movie that you did not like and try to explain the plot objectively.' },
        { prompt: 'If you could live inside one of your favorite stories, what would you change about it?' },
        { prompt: 'Describe your favorite location.' },
        { prompt: 'In 10 years from now, what historical event from this past year do you think they will be talking about?' },
        { prompt: 'Write about why you enjoy writing.' },
        { prompt: 'Tell a story about one of your fondest childhood memories.' },
    ]);
    console.log('stories have been seeded');

    await Comment.deleteMany();

    const comments = await Comment.insertMany([
        {
            commentText: '',
            author: '',
            createdAt: '',
    
        },
    ])
})