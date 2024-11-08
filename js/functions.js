async function loadEvents() {
    try {
        const response = await fetch('/events.json');
        //A. if fail
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }
        //B. if success
        const events = await response.json();
        console.log(events);
        return events;
    }
    catch (error) {
        console.error('Error fetching events');
    }
}

function drawTimeline(events) {
    //variables
    const canvas = document.getElementById("timelineCanvas");
    const ctx = canvas.getContext('2d');
    const start_x = 50;
    const lineY = 100;
    const gap = 200;
    //draw timeline
    ctx.beginPath();
    ctx.moveTo(start_x, lineY);
    ctx.lineTo(start_x + gap * (events.length - 1), lineY);
    ctx.stroke();
    //draw events
    for (let i = 0; i < events.length; i++) {
        const event = events[i];
        const x = start_x + gap * i;
        //draw year
        ctx.fillText(event.year, x, lineY - 10);
        //draw description
        ctx.fillText(event.description, x, lineY + 10);
        //draw a circle at each event
        ctx.beginPath();
        ctx.arc(x, lineY, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}


