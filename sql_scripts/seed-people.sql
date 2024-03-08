-- seed-people.sql
INSERT INTO people (first_name, last_name, age, email, photo_url,  bio, created_at, updated_at) VALUES
(
    'Tyler',
    'Olmsted',
    42,
    'me@tylerolmsted.co',
    'https://www.tylerolmsted.co/img/blog-author.jpg',
    'With over fifteen years in the tech industry,I have spearheaded software teams in crafting cutting-edge SaaS and mobile applications,steering them from conceptualization to successful launch. I thrive on igniting an organizations maximum potential,cultivating a culture rooted in user-centric innovation,and continually pushing the boundaries of what is attainable. My passion lies in leveraging agile methodologies,rapid prototyping,and lean startup principles to drive product development and deliver scalable solutions in fast-paced startup environments.Most recently,as VP of Engineering at Backflip,I established the engineering teams and led the launch of their flagship iOS and Android apps. Throughout my tenure there,I guided the team through a successful Series A funding round and played a pivotal role in architecting and building Backflips engineering and IT infrastructure,ensuring scalability and resilience to support rapid expansion and innovation.',
    '2020-01-01 00:00:00',
    '2020-01-01 00:00:00'
),
(
    'Jack',
    'Danger',
    28,
    'jack@example.com',
    'https://pinballmag.fr/wp-content/uploads/2020/10/48411752_10157042577994244_8654060717177044992_o.jpg',
    'This is Jack Danger.',
    '2020-01-01 00:00:00',
    '2020-01-01 00:00:00'
),
(
    'John',
    'Arbuckle',
    33,
    'john@example.com',
    'https://cdn.costumewall.com/wp-content/uploads/2018/09/jon-arbuckle.jpg',
    'This is John Arbuckle.',
    '2020-01-01 00:00:00',
    '2020-01-01 00:00:00'
),
(
    'Hanna',
    'Trace',
    35,
    'hanna@example.com',
    'https://assets.rebelmouse.io/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8yMDQyNzA0Ny9vcmlnaW4uanBnIiwiZXhwaXJlc19hdCI6MTcyNzc3NjAwOH0.tBulNq02hUK3BOjrhlXb6VL0SLq0OiUwtzBEOdHDTis/img.jpg?width=1200&height=600&coordinates=0%2C0%2C0%2C403',
    'This is Hanna Trace.',
    '2020-01-01 00:00:00',
    '2020-01-01 00:00:00'
)
ON CONFLICT (email) DO NOTHING;