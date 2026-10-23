import type { BrandPage } from "@/components/BrandLandingPage";

export const PORSCHE_PAGE: BrandPage = {
  name: "Porsche",
  slug: "sell-my-broken-porsche",
  title: "Sell Your Broken Porsche",
  metaTitle: "Sell Your Broken Porsche | 911, Boxster & Cayman",
  description: "Sell a broken, damaged or non-running Porsche 911, Boxster or Cayman. Engine and gearbox faults considered. Request a free, no-obligation valuation.",
  image: "/models/porsche-supercar.webp",
  imageAlt: "Porsche sports car",
  intro: [
    "A Porsche with engine damage or a gearbox fault needs a valuation that starts with the actual car. We consider broken, damaged and non-running 911s, Boxsters and Caymans, including cars waiting at a workshop while you decide what to do next.",
    "Send the registration, mileage and a description of the fault for a free, no-obligation valuation. You can compare the offer with a repair estimate before spending more. Collection can be arranged when a sale is agreed.",
  ],
  sections: [
    { id: "porsche-model", title: "Your model, generation and transmission", paragraphs: [
      "A 911 Carrera, a Boxster and a Cayman can have very different repair requirements. Start with the registration and year; add the model, engine, body style and trim if known. Include details of modifications or a replacement engine or transmission.",
      "Tell us whether it has a manual, PDK or another transmission. PDK is Porsche's dual-clutch transmission, but it is not fitted to every Porsche. The exact model and year matter, particularly when a garage's findings are being compared with repair information about another car.",
      "You do not need to decode every option before making an enquiry. Service records, specialist invoices and photographs can help fill in the detail during the follow-up.",
    ] },
    { id: "porsche-engine", title: "Engine failure or an unresolved engine problem", paragraphs: [
      "We consider Porsches with diagnosed engine damage, overheating, coolant loss and starting problems. Tell us what happened, whether it still runs and what a specialist has actually established. If a report identifies bore scoring, bearing damage or another internal fault, share the report rather than applying that diagnosis to a noise alone.",
      "Mention any dismantling and whether removed components are included. An engine already out of the car, missing ancillaries or an incomplete investigation can affect both valuation and collection. You can enquire without funding further repairs first. Our [bore-scoring repair-or-sell guide](/blog/porsche-bore-scoring-repair-or-sell) covers inspection evidence and repair scope in more detail.",
      "If you are still deciding, our [engine-failure repair-or-sell guide](/blog/supercar-engine-failure-repair-or-sell) explains how to compare an as-is offer with a repair proposal, including uncertain additional work.",
    ] },
    { id: "porsche-transmission", title: "PDK, manual gearbox and clutch faults", paragraphs: [
      "Describe the behaviour: a transmission warning, harsh changes, loss of drive, difficulty selecting a gear or a clutch that will not engage. Include diagnostic codes and the specialist's written findings where available. A warning message does not establish that a complete gearbox replacement is required.",
      "Our [Porsche PDK fault guide](/blog/sell-porsche-pdk-gearbox-fault) goes into the information a buyer needs and the questions to ask about repair options. This selling page is the place to request an assessment of the whole vehicle, including faults outside the transmission.",
      "If the car cannot select neutral or its wheels will not turn, say so before booking collection. The loading plan needs to suit the vehicle's present condition.",
    ] },
    { id: "porsche-damage", title: "Accident damage and unfinished repairs", paragraphs: [
      "A damaged Porsche can be assessed with photographs and a clear account of the work required. Include damage to wheels or suspension, deployed airbags, missing panels and any known insurance category. For a convertible, mention roof damage, water ingress or a roof that will not close.",
      "Be clear about which loose or removed parts come with the car. If an insurer, workshop or another party is involved, explain the situation before accepting an offer. Our [Category S and Category N guide](/blog/sell-category-s-n-supercar) covers the questions to resolve about a written-off vehicle.",
    ] },
    { id: "porsche-valuation", title: "What changes the offer for a broken Porsche?", paragraphs: [
      "The model and specification, mileage, service history, bodywork, completeness and confirmed faults all contribute. There is no fixed percentage to deduct from an advertised running-car price for every broken engine or gearbox.",
      "Send photographs and any specialist estimate you already have. If the diagnosis is incomplete, make that explicit. Include other known problems so the assessment is based on the condition the buyer will find, not only the headline fault.",
      "Our [non-runner valuation guide](/blog/non-runner-supercar-value) explains the evidence that helps. If you are weighing up an auction too, compare fees, transport, payment timing and the terms of the offer using our [auction-or-specialist-buyer guide](/blog/broken-supercar-auction-or-specialist-buyer).",
    ] },
    { id: "porsche-handover", title: "From enquiry to collection", paragraphs: [
      "Use the form below with the registration, mileage, collection postcode and your contact details. Describe the fault and where the Porsche is kept. Have photographs and any reports ready for the follow-up.",
      "We buy directly and also work with specialist buyers. Before proceeding, confirm who is buying the car, whether the offer is subject to inspection, what is included and the collection and payment arrangements.",
      "Tell us about low ground clearance, locked wheels, restricted access or a vehicle on a workshop ramp. Agree access and release arrangements with the garage where relevant. The car does not need to be driven to a branch to start the process.",
    ] },
  ],
  faqs: [
    { question: "Can I sell a Porsche with engine failure?", answer: "Yes. We consider Porsches with diagnosed engine damage and non-runners. Include the exact model, mileage, report if available and details of any dismantling or missing parts." },
    { question: "Do you consider Boxsters and Caymans as well as 911s?", answer: "Yes. Tell us the model, year and specification, together with the faults. You do not need to own a particular high-performance version to request a valuation." },
    { question: "Can I enquire about a PDK fault without a final diagnosis?", answer: "Yes. Describe the warning and symptoms and explain what has or has not been checked. More information may be needed before an offer is finalised." },
    { question: "Can the car be collected if it will not select neutral?", answer: "Tell the team before collection is arranged. Whether it rolls and steers, the ground clearance and the access all affect the equipment needed. Suitable arrangements must be confirmed for your car." },
    { question: "Is an online enquiry a commitment to sell?", answer: "No. The valuation enquiry is free and carries no obligation. Review the buyer's offer, any inspection conditions and the handover arrangements before deciding." },
  ],
};
