import type { FaqItem } from "@/lib/faq";

type TextBlock = { title: string; body: string };
export type RegionalPage = {
  name: string;
  slug: string;
  description: string;
  hero: string;
  image: string;
  imageAlt: string;
  secondaryImage: string;
  secondaryAlt: string;
  introTitle: string;
  intro: string[];
  collectionTitle: string;
  collectionIntro: string;
  collection: TextBlock[];
  coverageIntro: string;
  areas: TextBlock[];
  preparationTitle: string;
  preparation: TextBlock[];
  closing: string;
  faqs: FaqItem[];
  related: string[];
};

const images = {
  red: "/locations/red-lamborghini.webp",
  front: "/locations/orange-lamborghini-front.webp",
  lineup: "/locations/prestige-car-lineup.webp",
  evening: "/locations/orange-lamborghini-evening.webp",
};
const alt = {
  red: "Red Lamborghini parked on a residential street",
  front: "Front view of an orange Lamborghini on a paved forecourt",
  lineup:
    "Range Rover, Bentley convertible, Mercedes and Lamborghini on a forecourt",
  evening: "Orange Lamborghini on a forecourt at dusk",
};

export const REGIONAL_PAGES: RegionalPage[] = [
  {
    name: "Essex",
    slug: "sell-my-broken-supercar-essex",
    description:
      "Sell your broken or non-running supercar in Essex. Specialist valuations and free collection from Chelmsford, Colchester, Brentwood and across the county.",
    hero: "A supercar with engine trouble, accident damage or a gearbox fault can still have a buyer. Tell us about your car in Essex for a specialist valuation and free collection if you accept an offer.",
    image: images.red,
    imageAlt: alt.red,
    secondaryImage: images.lineup,
    secondaryAlt: alt.lineup,
    introTitle: "An alternative to another repair bill",
    intro: [
      "If your Ferrari is waiting at a specialist in Chelmsford, your Lamborghini is parked up in Brentwood or your Porsche will not start in Colchester, you can enquire about selling it in its current condition. You do not need to commission a repair before asking for a valuation.",
      "We assess the model, mileage, specification and history alongside the fault. A workshop diagnosis, estimate or photographs can help us understand the work involved, but a confirmed diagnosis is not a requirement for an initial enquiry.",
      "Our team is based in Medway and arranges collection across Essex, including Southend-on-Sea and Thurrock. Share the car’s actual location, even if it is different from your home address, so collection can be discussed accurately.",
    ],
    collectionTitle:
      "Collection from your Essex driveway, garage or storage site",
    collectionIntro:
      "Where the car is standing matters as much as its postcode. These details help us plan a collection that suits the vehicle and the site.",
    collection: [
      {
        title: "At a repair workshop",
        body: "Tell us the workshop’s address, opening hours and contact arrangements. Confirm that the car can be released and whether any parts have been removed during diagnosis or repair.",
      },
      {
        title: "On a driveway or private estate",
        body: "Mention narrow entrances, gates, steep approaches or limited turning space. If the suspension has dropped or a wheel will not turn, include that before collection is arranged.",
      },
      {
        title: "At a rural or coastal address",
        body: "Send the full postcode and clear directions if the entrance is difficult to find. Let us know about unmade access roads or any restrictions at the storage location.",
      },
    ],
    coverageIntro:
      "We consider enquiries throughout Essex and the neighbouring Southend-on-Sea and Thurrock areas. Collection is arranged from the agreed location after an offer is accepted.",
    areas: [
      {
        title: "Chelmsford and central Essex",
        body: "Chelmsford, Witham, Maldon, Braintree and Great Dunmow.",
      },
      {
        title: "West Essex",
        body: "Brentwood, Billericay, Ingatestone, Epping, Harlow and Saffron Walden.",
      },
      {
        title: "North and coastal Essex",
        body: "Colchester, Halstead, Manningtree, Harwich and Clacton-on-Sea.",
      },
      {
        title: "South Essex, Southend and Thurrock",
        body: "Basildon, Wickford, Rayleigh, Southend-on-Sea, Leigh-on-Sea, Grays and Tilbury.",
      },
    ],
    preparationTitle: "What to send with your Essex valuation enquiry",
    preparation: [
      {
        title: "The car and the fault",
        body: "Include the registration, mileage, exact model and a clear description of the symptoms. Explain whether it starts, selects gears and moves under its own power.",
      },
      {
        title: "Any work already started",
        body: "Share what a garage has diagnosed, what has been replaced and whether dismantled parts are still with the vehicle. A repair estimate can provide useful context.",
      },
      {
        title: "Location and availability",
        body: "Give the collection postcode and any appointment or access restrictions. Tell us whether the keys and available paperwork are with you or at the garage.",
      },
    ],
    closing:
      "From a non-running McLaren to a Bentley with suspension problems, start with the details you already have. We’ll discuss the car, the proposed buyer and collection from your Essex address.",
    faqs: [
      {
        question: "Can you collect a non-running supercar in Essex?",
        answer:
          "Yes. We arrange free collection across Essex once an offer and the collection details are agreed. Tell us whether the car rolls, steers and has working brakes so suitable recovery can be planned.",
      },
      {
        question: "Do you cover Southend-on-Sea and Thurrock?",
        answer:
          "Yes. We welcome enquiries from Southend-on-Sea, Leigh-on-Sea, Grays, Tilbury and the surrounding areas, as well as the rest of Essex.",
      },
      {
        question: "Can I sell a car that is still at an Essex garage?",
        answer:
          "Yes, you can enquire while the car is at a workshop. Before collection, confirm release arrangements with the garage and tell us about opening hours, outstanding work and any removed parts.",
      },
      {
        question: "Should I repair the gearbox before selling?",
        answer:
          "You can request a valuation with the gearbox fault as it stands. Share the diagnosis or symptoms and any repair estimate so the buyer can assess the vehicle before you decide what to do.",
      },
      {
        question: "Are you based in Essex?",
        answer:
          "Our team is based in Medway, Kent, and arranges collection across Essex. We buy directly and also introduce vehicles to specialist buyers; the proposed buyer will be explained before you agree to a sale.",
      },
      {
        question: "When will I be paid for my car?",
        answer:
          "Payment arrangements are confirmed before collection. The agreed payment must be cleared before the vehicle leaves; do not rely only on a transfer screenshot or a promise of later payment.",
      },
    ],
    related: [
      "sell-my-broken-supercar-kent",
      "sell-my-broken-supercar-greater-london",
    ],
  },
  {
    name: "Greater London",
    slug: "sell-my-broken-supercar-greater-london",
    description:
      "Sell a broken, damaged or non-running supercar in Greater London. Request a specialist valuation with free collection from your agreed London location.",
    hero: "Selling a broken supercar in London starts with the car’s details, not a trip across the city. Request a specialist valuation for your damaged or non-running vehicle, with free collection once an offer is agreed.",
    image: images.lineup,
    imageAlt: alt.lineup,
    secondaryImage: images.red,
    secondaryAlt: alt.red,
    introTitle: "A way forward when your London supercar is off the road",
    intro: [
      "A fault can leave a valuable car occupying a parking space while you decide whether another repair is worthwhile. We consider Ferrari, Lamborghini, McLaren, Porsche and other specialist cars with mechanical failures, electrical faults or accident damage throughout Greater London.",
      "You can begin from home by telling us the registration, mileage and what has gone wrong. There is no need to drive a faulty car to a valuation appointment. If the car is being assessed by a specialist, share the findings and explain which work has already been authorised or completed.",
      "This page covers the wider London area, from outer borough driveways to central storage and workshop locations. Our Medway-based team arranges collection; the timing and access plan are agreed for each vehicle rather than assumed from its postcode.",
    ],
    collectionTitle: "Plan London collection around the parking location",
    collectionIntro:
      "A full address is the starting point. Let us know how the vehicle can be reached and what the recovery team needs to work around.",
    collection: [
      {
        title: "Underground and managed parking",
        body: "Share the entrance height, ramps, tight turns and whether the car can be moved to an accessible loading point. Confirm access with the building manager before a collection slot is agreed.",
      },
      {
        title: "Street parking and restricted access",
        body: "Tell us about parking bays, controlled entrances, loading restrictions or a road that recovery vehicles cannot easily enter. We can discuss the practical arrangements before the day.",
      },
      {
        title: "Specialist workshops and secure storage",
        body: "Provide the site’s booking requirements and opening times. Tell us who holds the keys and who can authorise release if you will not be there yourself.",
      },
    ],
    coverageIntro:
      "We welcome enquiries across Greater London. The areas below are examples of coverage, not branch locations; include your postcode even if your neighbourhood is not listed.",
    areas: [
      {
        title: "North London",
        body: "Barnet, Enfield, Haringey and surrounding neighbourhoods.",
      },
      {
        title: "East London",
        body: "Stratford, Ilford, Barking, Romford and nearby areas.",
      },
      {
        title: "West and central London",
        body: "Ealing, Hounslow, Hillingdon, Kensington, Chelsea and Westminster.",
      },
      {
        title: "South London",
        body: "Wandsworth, Lambeth, Southwark, Lewisham, Greenwich, Croydon, Bromley and surrounding areas.",
      },
    ],
    preparationTitle: "Build a useful valuation picture before collection",
    preparation: [
      {
        title: "Separate known faults from symptoms",
        body: "Tell us what a specialist has confirmed and what you have noticed yourself. A warning light, flat battery and diagnosed engine failure give a buyer very different information.",
      },
      {
        title: "Show the whole vehicle",
        body: "Exterior and interior photographs, service history and details of any recorded insurance category help establish the car’s condition beyond the immediate problem.",
      },
      {
        title: "Describe the access route",
        body: "Mention barriers, security appointments, underground parking and whether the car can roll and steer. Share the location where it is actually stored, rather than just your correspondence address.",
      },
    ],
    closing:
      "Tell us about the car and where it is parked. We’ll review the enquiry, explain any proposed offer and arrange the next step around your London collection location.",
    faqs: [
      {
        question: "Do I need to drive my supercar to you?",
        answer:
          "No. Start with the online valuation form and describe the vehicle’s condition. If you accept an offer, free collection can be arranged from an agreed Greater London location.",
      },
      {
        question: "Can you collect from an underground London car park?",
        answer:
          "Access needs to be assessed first. Tell us the height limit, ramp layout, turning space and whether the vehicle rolls and steers. Collection arrangements depend on what equipment can safely reach the car.",
      },
      {
        question: "Do you cover outer London boroughs?",
        answer:
          "Yes. We consider enquiries across Greater London, including outer boroughs such as Barnet, Hillingdon, Havering, Bromley and Croydon. Include the collection postcode with your enquiry.",
      },
      {
        question: "Is there a separate page for South London?",
        answer:
          "Yes. Our South London page covers collection considerations and areas south of the river in more detail. The valuation process and existing enquiry form are the same.",
      },
      {
        question: "Who will buy my London supercar?",
        answer:
          "We buy vehicles directly and also work with specialist buyers. We’ll make the proposed buyer and sale arrangements clear before you agree to proceed.",
      },
      {
        question: "Can collection be booked around my building’s access hours?",
        answer:
          "Tell us the available hours and any booking requirements when you enquire. We’ll confirm an achievable collection slot after reviewing the vehicle and location, rather than promise a time before access is understood.",
      },
    ],
    related: [
      "sell-my-broken-supercar-south-london",
      "sell-my-broken-supercar-essex",
      "sell-my-broken-supercar-kent",
    ],
  },
  {
    name: "South London",
    slug: "sell-my-broken-supercar-south-london",
    description:
      "Sell your broken supercar in South London. Engine faults, accident damage and non-runners considered, with free collection from your agreed location.",
    hero: "A non-running supercar on a South London driveway or in a garage does not have to wait for another repair. Tell us what is wrong and request a specialist valuation, with free collection after an offer is accepted.",
    image: images.front,
    imageAlt: alt.front,
    secondaryImage: images.evening,
    secondaryAlt: alt.evening,
    introTitle: "Sell from where your car is standing",
    intro: [
      "Whether your Porsche has developed engine trouble in Wimbledon, your Aston Martin is awaiting repairs in Bromley or your McLaren is parked up in Croydon, the first step is the same: tell us about the model, its history and the fault.",
      "We consider cars that start but cannot be driven reliably, vehicles that will not start at all and supercars with accident damage. If the problem is intermittent, describe when it appears and what a workshop has checked. You can make an initial enquiry without paying for further investigation.",
      "Our team is based in Medway and arranges collection across South London. We’ll discuss the actual collection address and how the car can be recovered, including vehicles at workshops or on private property with limited access.",
    ],
    collectionTitle: "The details that make a South London collection workable",
    collectionIntro:
      "Driveways, shared entrances and residential streets can each need a different approach. Give us the access details alongside the car’s condition.",
    collection: [
      {
        title: "Driveways and dropped suspension",
        body: "A low supercar may need extra planning around a steep drive or a raised kerb. Tell us its ground clearance, whether the suspension is working and if damaged bodywork could obstruct loading.",
      },
      {
        title: "Shared garages and residential streets",
        body: "Mention gates, parked vehicles, narrow entrances and any agreed access times. Do not move a car with a serious fault just to make it easier to reach; discuss its position with us first.",
      },
      {
        title: "A car left with a specialist",
        body: "Confirm when the workshop can release the vehicle, whether it has been reassembled and where the keys are held. Include the garage postcode if it differs from your own.",
      },
    ],
    coverageIntro:
      "We consider enquiries throughout South London, including the south-east and south-west areas below. For a vehicle elsewhere in the capital, see our Greater London page.",
    areas: [
      {
        title: "Inner South London",
        body: "Battersea, Clapham, Brixton, Dulwich and Peckham.",
      },
      {
        title: "South-west London",
        body: "Wandsworth, Putney, Wimbledon, Richmond and Kingston upon Thames.",
      },
      {
        title: "South-east London",
        body: "Lewisham, Greenwich, Eltham, Bexley and Bromley.",
      },
      {
        title: "Southern neighbourhoods",
        body: "Croydon, Purley, Sutton, Carshalton and Mitcham.",
      },
    ],
    preparationTitle: "Help us assess the fault and the recovery together",
    preparation: [
      {
        title: "What still works?",
        body: "Let us know whether the engine starts, the gearbox selects neutral and the steering or brakes are affected. Mention a flat battery or missing key separately from the main fault.",
      },
      {
        title: "What has changed?",
        body: "Describe how the problem began, recent repairs and any diagnostic findings. If the car has been stored, say roughly how long it has been off the road.",
      },
      {
        title: "What surrounds the car?",
        body: "A description of the drive, entrance or parking space helps us plan access. Include obstructions, gradients and any permission needed from a site or property manager.",
      },
    ],
    closing:
      "You can start without moving the car. Send its details and South London postcode through the valuation form, and we’ll discuss the condition, proposed buyer and collection arrangements.",
    faqs: [
      {
        question: "Do you collect broken supercars in Croydon and Bromley?",
        answer:
          "Yes. We arrange free collection from agreed locations in Croydon, Bromley and across South London after an offer is accepted and the vehicle’s access requirements are confirmed.",
      },
      {
        question: "What if my car is stuck on a steep driveway?",
        answer:
          "Tell us about the gradient, ground clearance and whether the car rolls and steers. Photographs of the access can help. Recovery needs to be planned around the location, so discuss it before attempting to move the car.",
      },
      {
        question:
          "Will you consider a car with an intermittent electrical fault?",
        answer:
          "Yes. Explain the symptoms, when they happen and what has already been checked. A diagnostic report is helpful if you have one, but you can enquire without a confirmed diagnosis.",
      },
      {
        question:
          "Can I sell a damaged supercar that is at a South London workshop?",
        answer:
          "Yes. Include the workshop address, the car’s repair status and the release arrangements. Any removed components and available keys should be described before collection is agreed.",
      },
      {
        question: "Are collection and valuation separate charges?",
        answer:
          "The valuation enquiry is free and without obligation. Free collection is available from the agreed South London location once the offer and arrangements are confirmed.",
      },
      {
        question: "Do you cover the rest of London too?",
        answer:
          "Yes. Our Greater London page covers the wider capital. Wherever the car is located, we’ll explain whether we are buying directly or introducing a specialist buyer before you proceed.",
      },
    ],
    related: [
      "sell-my-broken-supercar-greater-london",
      "sell-my-broken-supercar-kent",
    ],
  },
  {
    name: "Glasgow",
    slug: "sell-my-broken-supercar-glasgow",
    description:
      "Sell a broken or non-running supercar in Glasgow. Specialist valuations for damaged and faulty cars, with free collection arranged after an offer is agreed.",
    hero: "Engine failure, transmission trouble or a supercar that has been parked up for months? Request a specialist valuation for your car in Glasgow, with free collection arranged once you accept an offer.",
    image: images.evening,
    imageAlt: alt.evening,
    secondaryImage: images.front,
    secondaryAlt: alt.front,
    introTitle:
      "A specialist buyer enquiry from Glasgow, without the drive south",
    intro: [
      "A broken Ferrari, Lamborghini or McLaren can be difficult to sell when a viewing cannot include a normal test drive. We consider the car’s specification, history and remaining condition alongside the mechanical problem or damage, so you can explore a sale as it stands.",
      "Our team is based in Medway, Kent, and serves mainland UK, including Glasgow. You do not need to deliver a non-runner to us. Start with the vehicle details and its Glasgow location; collection planning follows once an offer and the buyer’s arrangements are agreed.",
      "For a car awaiting a major repair, send the diagnosis and any estimate you already have. If it has been in storage, explain how long it has been standing and whether anyone has recently checked that it rolls, steers and can be accessed.",
    ],
    collectionTitle: "Agree the Glasgow collection details before handover",
    collectionIntro:
      "For a collection over a longer distance, clear information upfront helps everyone prepare. We confirm the arrangements for your car and do not assume a same-day collection is available.",
    collection: [
      {
        title: "A confirmed collection window",
        body: "Tell us which days and times you or the vehicle’s custodian can attend. We’ll discuss availability after the offer, taking the location and recovery requirements into account.",
      },
      {
        title: "Vehicle readiness and access",
        body: "Mention seized brakes, punctures, lowered suspension or a gearbox that cannot select neutral. Describe the entrance and loading space at your home, garage or storage site.",
      },
      {
        title: "A clear release arrangement",
        body: "Confirm where the keys and available documents will be, and who can release the vehicle. Payment must be cleared before the car leaves the agreed collection location.",
      },
    ],
    coverageIntro:
      "We welcome enquiries from across Glasgow and can discuss nearby collection locations. The surrounding towns below are part of the wider service area, not Glasgow branch addresses.",
    areas: [
      {
        title: "City centre and West End",
        body: "Central Glasgow, Finnieston, Partick, Hillhead and nearby neighbourhoods.",
      },
      {
        title: "North and east Glasgow",
        body: "Maryhill, Springburn, Dennistoun, Shettleston and surrounding areas.",
      },
      {
        title: "Glasgow Southside",
        body: "Shawlands, Pollokshields, Giffnock and nearby collection locations.",
      },
      {
        title: "Around Glasgow",
        body: "Paisley, Renfrew, Clydebank, Bearsden, East Kilbride and Hamilton. Send the exact postcode to discuss your location.",
      },
    ],
    preparationTitle: "What helps with a Glasgow supercar valuation?",
    preparation: [
      {
        title: "Evidence of the condition",
        body: "Recent photographs, mileage and service history help a buyer understand the car before collection. Point out accident damage, warning lights and any recorded insurance category.",
      },
      {
        title: "The repair position",
        body: "Tell us whether the car is complete, has been dismantled or is waiting for parts. Include specialist findings and describe which removed components are available.",
      },
      {
        title: "The handover plan",
        body: "Share the collection postcode, access restrictions and the person available at the location. If a garage holds the vehicle, check its release and appointment requirements.",
      },
    ],
    closing:
      "Tell us about your Glasgow supercar, its fault and where it is kept. We’ll review the enquiry and discuss a possible sale with collection, so you can make an informed decision about the next step.",
    faqs: [
      {
        question:
          "Do you buy broken supercars in Glasgow even though you are based in Kent?",
        answer:
          "Yes. Our Medway-based team considers enquiries across mainland UK, including Glasgow. We buy directly and also work with specialist buyers, with the proposed buyer explained before a sale is agreed.",
      },
      {
        question: "Is Glasgow collection free?",
        answer:
          "Free collection is available from the agreed Glasgow location once an offer is accepted and the collection requirements have been confirmed. You do not need to transport the car to Kent yourself.",
      },
      {
        question: "How quickly can you collect from Glasgow?",
        answer:
          "The collection date depends on the vehicle, access and transport availability. We’ll agree a suitable window after reviewing those details. We do not promise same-day collection before the arrangements are confirmed.",
      },
      {
        question: "Can I enquire from Paisley or East Kilbride?",
        answer:
          "Yes. We welcome enquiries from locations around Glasgow, including Paisley and East Kilbride. Provide the full collection postcode and describe any access restrictions.",
      },
      {
        question: "What if my supercar has been stored for a long time?",
        answer:
          "Explain how long it has been standing and what is known about its condition. Tell us about missing keys, flat tyres, seized brakes or removed parts. You can request a valuation without first returning it to running order.",
      },
      {
        question: "Will my payment clear before the car is transported?",
        answer:
          "The agreed payment must be cleared before the vehicle leaves. We’ll explain payment and handover arrangements with the proposed buyer before collection takes place.",
      },
    ],
    related: ["sell-my-broken-supercar-edinburgh"],
  },
  {
    name: "Edinburgh",
    slug: "sell-my-broken-supercar-edinburgh",
    description:
      "Sell your broken or damaged supercar in Edinburgh. Non-runners and major faults considered, with specialist valuations and free collection by arrangement.",
    hero: "If your supercar needs a major repair or no longer starts, you can explore selling it as it stands. Request a specialist valuation in Edinburgh, with free collection after the offer and arrangements are agreed.",
    image: images.lineup,
    imageAlt: alt.lineup,
    secondaryImage: images.evening,
    secondaryAlt: alt.evening,
    introTitle: "Consider a sale before committing to more repair work",
    intro: [
      "An Edinburgh owner with a broken Porsche, Aston Martin, Ferrari or another specialist model may be weighing up a repair estimate, storage costs and the time involved in finding a buyer. We can consider the car in its current condition so you have another option to discuss.",
      "The assessment looks beyond whether the engine starts. Model, specification, mileage, service records, accident history and the nature of the fault all help the buyer understand the vehicle. Describe unfinished repairs or missing components clearly, even if the car otherwise looks complete.",
      "We are based in Medway, Kent, and arrange collection across mainland UK, including Edinburgh. This is a collection service rather than a local Edinburgh branch. You can begin online and discuss the proposed buyer, offer and transport arrangements before committing to a sale.",
    ],
    collectionTitle:
      "Collection planning for Edinburgh’s different parking locations",
    collectionIntro:
      "From a private garage to a managed courtyard, let us know how your car can be reached. The collection plan is agreed around the vehicle and its surroundings.",
    collection: [
      {
        title: "Courtyards, lanes and shared entrances",
        body: "Tell us about narrow approaches, gates, turns and any permission needed to access the space. If the car cannot be moved, explain its position before a recovery vehicle is booked.",
      },
      {
        title: "Sloping drives and low cars",
        body: "Mention the driveway gradient, available ground clearance and any suspension or wheel damage. These details help determine how a low supercar can be loaded.",
      },
      {
        title: "Workshops and storage outside the centre",
        body: "Send the actual collection address and the site’s available hours. Confirm that the car and any removed parts can be released together, with keys available for handover.",
      },
    ],
    coverageIntro:
      "We welcome enquiries throughout Edinburgh and can discuss collection from the surrounding Lothians. Include your postcode to confirm the location and practical arrangements.",
    areas: [
      {
        title: "Central and north Edinburgh",
        body: "New Town, Stockbridge, Leith, Trinity and surrounding neighbourhoods.",
      },
      {
        title: "West Edinburgh",
        body: "Murrayfield, Corstorphine, Cramond and nearby areas.",
      },
      {
        title: "South and east Edinburgh",
        body: "Morningside, Bruntsfield, Newington, Duddingston and Portobello.",
      },
      {
        title: "Edinburgh’s surrounding area",
        body: "South Queensferry, Musselburgh, Dalkeith and Livingston. Collection details are agreed for the exact address.",
      },
    ],
    preparationTitle: "Give the buyer a clear picture of your Edinburgh car",
    preparation: [
      {
        title: "History alongside the diagnosis",
        body: "Include service records and recent repair information where available. A specialist’s written findings can be more useful than a broad description such as ‘engine problem’.",
      },
      {
        title: "Current photographs and completeness",
        body: "Show the exterior, interior and visible damage. Tell us if repairs are unfinished, panels have been removed or any parts are stored separately from the vehicle.",
      },
      {
        title: "Access and handover availability",
        body: "Explain where the car is kept, who holds the keys and any restrictions on collection hours. Let us know whether it rolls and steers and whether a battery or brake issue affects moving it.",
      },
    ],
    closing:
      "Start with your vehicle details, the problem and its Edinburgh collection postcode. We’ll discuss the assessment and next steps, with no obligation to accept an offer.",
    faqs: [
      {
        question: "Do you have an Edinburgh branch?",
        answer:
          "Our team is based in Medway, Kent. We offer a mainland UK collection service that includes Edinburgh, and we explain the proposed buyer and arrangements before you decide to proceed.",
      },
      {
        question: "Can you collect a supercar from a narrow Edinburgh lane?",
        answer:
          "The access needs to be checked first. Tell us about the lane width, turns, gates and whether the car can roll and steer. Photographs can help establish a workable collection plan.",
      },
      {
        question: "Do you cover places around Edinburgh?",
        answer:
          "Yes, you can enquire from the surrounding area, including Musselburgh, Dalkeith and Livingston. Send the exact postcode so we can discuss the collection location and access.",
      },
      {
        question: "Can I sell a supercar with unfinished repairs?",
        answer:
          "Yes, we consider these enquiries. Describe the work started, what is still required, which components have been removed and whether all the parts are available with the vehicle.",
      },
      {
        question:
          "Do I need a confirmed diagnosis before asking for a valuation?",
        answer:
          "No. Explain the symptoms and what has already been checked. If you have a specialist report, share it, but you can start an enquiry without commissioning further diagnostic work.",
      },
      {
        question: "How are collection and payment arranged in Edinburgh?",
        answer:
          "After an offer is accepted, the collection slot and any access requirements are confirmed. Collection is free from the agreed location, and the payment must be cleared before the vehicle leaves.",
      },
    ],
    related: ["sell-my-broken-supercar-glasgow"],
  },
];

export function getRegionalPage(slug: string): RegionalPage {
  const page = REGIONAL_PAGES.find((item) => item.slug === slug);
  if (!page) throw new Error(`Missing regional page: ${slug}`);
  return page;
}
