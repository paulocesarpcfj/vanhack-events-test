const events = [
    {
        id: 1,
        type: 'meetup',
        title: 'Barcelona Front End MeetUp',
        brief: 'Our virtual MeetUp is already scheduled and you can join us to talk about the future of Front End Development.',
        details: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rhoncus tellus ligula, sit amet pretium nisi venenatis in. Pellentesque a vestibulum sapien, at tincidunt tellus. Duis eget fermentum ante. Nullam vitae metus id lectus tincidunt vestibulum a eu sem. Ut nec libero eros.
        `,
        thumbnail: 'https://live.staticflickr.com/8461/7900730918_247d30d7ba_b.jpg',
        eventDate: '10/8/2020',
        location: 'Barcelona, Spain',
        
    },
    {
        id: 2,
        type: 'leap',
        title: 'JS Frameworks - A Brief Story',
        brief: 'This event will count with a lot of different VanHack members to discuss about new JS Frameworks.',
        details: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rhoncus tellus ligula, sit amet pretium nisi venenatis in. Pellentesque a vestibulum sapien, at tincidunt tellus. Duis eget fermentum ante. Nullam vitae metus id lectus tincidunt vestibulum a eu sem. Ut nec libero eros.
        `,
        thumbnail: 'https://live.staticflickr.com/867/41919615471_e697d171be_b.jpg',
        eventDate: '6/7/2020',
        location: 'New York, USA',
        
    },
    {
        id: 3,
        type: 'recruitingMission',
        title: 'How to apply for new positions',
        brief: 'Our team will help you in this conference with different approaches for better interviews results.',
        details: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rhoncus tellus ligula, sit amet pretium nisi venenatis in. Pellentesque a vestibulum sapien, at tincidunt tellus. Duis eget fermentum ante. Nullam vitae metus id lectus tincidunt vestibulum a eu sem. Ut nec libero eros.
        `,
        thumbnail: 'https://media-cdn.tripadvisor.com/media/photo-s/0c/bc/01/e2/vista-desde-el-corcovado.jpg',
        eventDate: '1/12/2020',
        location: 'Rio de Janeiro, Brazil',
        
    },
    {
        id: 4,
        type: 'vanhackaton',
        title: 'COVID-19 VanHackaton',
        brief: 'Let\'s work together to find health solutions for this pandemic.',
        details: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rhoncus tellus ligula, sit amet pretium nisi venenatis in. Pellentesque a vestibulum sapien, at tincidunt tellus. Duis eget fermentum ante. Nullam vitae metus id lectus tincidunt vestibulum a eu sem. Ut nec libero eros.
        `,
        thumbnail: 'https://live.staticflickr.com/3927/15320419130_82415963b6_b.jpg',
        eventDate: '9/5/2020',
        location: 'Vancouver, Canada',
        
    },
    {
        id: 5,
        type: 'webinar',
        title: '2021 and our new lifestyle',
        brief: 'John Doe will answer the question: "What will be different in 2021 and how to adapt to it?"',
        details: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rhoncus tellus ligula, sit amet pretium nisi venenatis in. Pellentesque a vestibulum sapien, at tincidunt tellus. Duis eget fermentum ante. Nullam vitae metus id lectus tincidunt vestibulum a eu sem. Ut nec libero eros.
        `,
        thumbnail: 'https://dickschmitt.com/travels/nederlands/Holland/Amsterdam/large_images/2009-07-17-amsterdam-13-rijksmuseum-2-stitched.JPG',
        eventDate: '3/8/2020',
        location: 'Amsterdam, Holland',
        premium: false,
    },
    {
        id: 6,
        type: 'webinar',
        title: 'How to present a Webinar?',
        brief: 'Yes! We will teach you how to improve your presenting skills with this Webinar about... Webinars?!',
        details: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rhoncus tellus ligula, sit amet pretium nisi venenatis in. Pellentesque a vestibulum sapien, at tincidunt tellus. Duis eget fermentum ante. Nullam vitae metus id lectus tincidunt vestibulum a eu sem. Ut nec libero eros.
        `,
        thumbnail: 'https://img.theculturetrip.com/768x432/wp-content/uploads/2019/06/shutterstock_569325409.jpg',
        eventDate: '5/10/2020',
        location: 'Berlin, Germany',
        premium: true,
    }
];

const eventTypes = {
    leap: {
        icon: 'fas fa-plane',
        label: 'Leap',
    },
    vanhackaton: {
        icon: 'fas fa-laptop',
        label: 'VanHackaton',
    },
    recruitingMission: {
        icon: 'far fa-star',
        label: 'Recruiting Mission',
    },
    webinar: {
        icon: 'fas fa-chart-pie',
        label: 'Webinar',
    },
    meetup: {
        icon: 'fas fa-user-friends',
        label: 'MeetUp',
    },
};

const orderedEvents = events.sort((eventA, eventB) => {   
    return new Date(eventA.eventDate) - new Date(eventB.eventDate); 
}); 

const featuredEventsTypes = ['leap', 'recruitingMission', 'vanhackaton'];
const featuredEvents = (eventsList) => eventsList.filter((event) => featuredEventsTypes.includes(event.type));

let currentAppliedEvents = localStorage.getItem('appliedEvents') || JSON.stringify([]);
let parsedAppliedEvents = JSON.parse(currentAppliedEvents);

const parseDate = (date) => new Date(date).toLocaleDateString();

const openPopup = (clickEvent) => {
    const eventContent = events.find((event) => event.id === Number($(clickEvent.target).attr('data-event-id')));

    $('.popup').removeClass('closed');

    return $('.popup > .content').append(`
        <div class="close ${eventContent.premium ? 'premiumSafeArea' : ''}" onClick="closePopup()">
            <i class="fas fa-times"></i>
        </div>

        <img src="${eventContent.thumbnail}" />

        ${eventContent.premium ? '<div class="premium"><i class="fas fa-crown"></i> Premium</div>' : ''}

        <div class="header">
            <div class="eventType ${eventContent.type}">
                <i class="${eventTypes[eventContent.type].icon}"></i> ${eventTypes[eventContent.type].label}
            </div>

            <div class="date"><i class="far fa-calendar-alt"></i> ${parseDate(eventContent.eventDate)}</div>
        </div>

        <div class="title" title="${eventContent.title}">${eventContent.title}</div>

        <p>
            ${eventContent.details}
        </p>

        <div class="map">
            <h5>Event Location</h5>

            <iframe 
                width="100%"
                height="250"
                frameborder="0"
                src="https://maps.google.com/maps?q=${eventContent.location}&z=12&amp;output=embed"
            >
            </iframe>
        </div>

        <div class="footer">
            <h5>Share with your friends</h5>

            <ul class="share">
                <li title="Share in Twitter" onClick="share('twitter')"><i class="fab fa-twitter"></i></li>
                <li title="Share in Facebook" onClick="share('facebook')"><i class="fab fa-facebook"></i></li>
                <li title="Share in LinkedIn" onClick="share('linkedin')"><i class="fab fa-linkedin"></i></li>
            </ul>
        </div>

        ${eventContent.premium ?
            `
                <div class="premiumDescription">
                    <span>This event is reserved for premium users only.</span>
                    <a href="https://vanhack.com/premium" target="_blank" class="premium">
                        JOIN PREMIUM NOW
                    </a>
                </div>
            ` :
            `
                <button
                    type="button"
                    onClick="toggleEventApplication(${eventContent.id}, ${true})"
                    class="${parsedAppliedEvents.includes(eventContent.id) ? 'applied' : ''}"
                >
                    ${parsedAppliedEvents.includes(eventContent.id) ? 'CANCEL SUBSCRIPTION' : 'APPLY'}
                </button>
            `
        }
    `);
}

const closePopup = () => {
    $('.popup').addClass('closed');
    $('.popup .content').empty();
}

$('.overlay').click(() => closePopup());

const noData = (wrapper) => {
    return $(wrapper).append('No events for this category :(');
}

const generateCard = (wrapper, event) => {
    return $(wrapper).append(`
        <div id="event-${event.id}" class="card ${event.premium ? 'premium' : ''}">
            <img src="${event.thumbnail}" />

            <div class="content">
                ${event.premium ? '<div class="premium"><i class="fas fa-crown"></i> Premium</div>' : ''}
                <div class="header">
                    <div class="info">
                        <div>
                            <span class="eventType ${event.type}">
                                <i class="${eventTypes[event.type].icon}"></i> ${eventTypes[event.type].label}
                            </span>
                        </div>
                        <span class="date"><i class="far fa-calendar-alt"></i> ${parseDate(event.eventDate)}</span>
                    </div>

                    <span class="title" title="${event.title}">${event.title}</span>
                </div>

                <p>
                    ${event.brief}
                </p>

                <div class="footer">
                    <ul class="share">
                        <li title="Share in Twitter" onClick="share('twitter')"><i class="fab fa-twitter"></i></li>
                        <li title="Share in Facebook" onClick="share('facebook')"><i class="fab fa-facebook"></i></li>
                        <li title="Share in LinkedIn" onClick="share('linkedin')"><i class="fab fa-linkedin"></i></li>
                    </ul>

                    <a data-event-id="${event.id}" onClick="openPopup(event)">More Details...</a>
                </div>
            </div>

            ${event.premium ?
                `
                    <span class="premiumDescription">This event is reserved for premium users only.</span>
                    <a href="https://vanhack.com/premium" target="_blank" class="premium">
                        JOIN PREMIUM NOW
                    </a>
                ` :
                `
                    <button
                        type="button"
                        onClick="toggleEventApplication(${event.id})"
                        class="${parsedAppliedEvents.includes(event.id) ? 'applied' : ''}"
                    >
                        ${parsedAppliedEvents.includes(event.id) ? 'CANCEL SUBSCRIPTION' : 'APPLY'}
                    </button>
                `
            }
        </div>
    `);
}

const generateFeaturedEvents = (eventsList) => {
    if (eventsList.length) {
        return eventsList.map((event) => generateCard('#featuredEvents', event));
    }
    
    return noData('#featuredEvents');
}
const generateAllEvents = (eventsList) => {
    if (eventsList.length) {
        return eventsList.map((event) => generateCard('#allEvents', event));
    }
    
    return noData('#allEvents');
}

const setInitialEvents = () => {
    generateFeaturedEvents(featuredEvents(orderedEvents));
    generateAllEvents(orderedEvents);
}

const filterEventsBy = (eventType) => {
    $('#featuredEvents').empty();
    $('#allEvents').empty();

    $('.eventTypeFilters > li.active').removeClass('active');
    $(`.eventTypeFilters > .clear`).removeClass('hidden');
    $(`.eventTypeFilters > .${eventType}`).addClass('active');

    const filteredEvents = events.filter((event) => event.type === eventType);

    generateFeaturedEvents(featuredEvents(filteredEvents));
    generateAllEvents(filteredEvents);
}

const clearFilters = () => {
    $('#featuredEvents').empty();
    $('#allEvents').empty();

    $('.eventTypeFilters > li.active').removeClass('active');
    $(`.eventTypeFilters > .clear`).addClass('hidden');

    setInitialEvents();
}

const share = (platform) => {
    const content = `Guys, take a look in this VanHack event!`;
    const url = 'https://vanhack.com/platform/#/events';

    switch (platform) {
        case 'facebook': {
            return window.open(`http://facebook.com/sharer/sharer.php?message=${content}&u=${encodeURIComponent(url)}`);
        }

        case 'twitter': {
            return window.open(`https://twitter.com/share?text=${content}&url=${encodeURIComponent(url)}`);
        }

        case 'linkedin': {
            return window.open(`http://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}`);
        }

        default:
            return false;
    }
}

const toggleEventApplication = (eventId, appliedByPopup) => {
    if (parsedAppliedEvents.includes(eventId)) {
        parsedAppliedEvents = parsedAppliedEvents.filter((appliedEventId) => appliedEventId !== eventId);
    
        $(`#event-${eventId} button`).html('APPLY');
        $(`#event-${eventId} button`).removeClass('applied');

        if (appliedByPopup) {
            $('.popup > .content > button').html('APPLY');
            $('.popup > .content > button').removeClass('applied');
        }

        localStorage.setItem('appliedEvents', JSON.stringify(parsedAppliedEvents));
    } else {
        parsedAppliedEvents.push(eventId);
    
        $(`#event-${eventId} button`).html('CANCEL SUBSCRIPTION');
        $(`#event-${eventId} button`).addClass('applied');

        if (appliedByPopup) {
            $('.popup > .content > button').html('CANCEL SUBSCRIPTION');
            $('.popup > .content > button').addClass('applied');
        }

        localStorage.setItem('appliedEvents', JSON.stringify(parsedAppliedEvents));
    }

    renderMyEventsList();
}

const renderMyEventsList = () => {
    $('#eventsCounter').html(parsedAppliedEvents.length);
    $('#my-events-list').empty();

    parsedAppliedEvents.map((appliedEvent) => {
        const eventContent = events.find((event) => event.id === appliedEvent);

        generateCard('#my-events-list', eventContent);
    });
}

setInitialEvents();
renderMyEventsList();
