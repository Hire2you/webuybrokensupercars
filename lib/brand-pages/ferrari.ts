import type { BrandPage } from "@/components/BrandLandingPage";

export const FERRARI_PAGE: BrandPage = {
  name: "Ferrari",
  slug: "sell-my-broken-ferrari",
  title: "Sell Your Broken Ferrari",
  metaTitle: "Sell Your Broken Ferrari | Faulty & Non-Running Cars",
  description: "Sell a broken, damaged or non-running Ferrari. Engine, gearbox and roof faults considered. Get a free valuation with collection arranged after agreement.",
  image: "/models/ferrari-supercar.webp",
  imageAlt: "Ferrari sports car",
  intro: [
    "A Ferrari sitting at a specialist with a repair estimate can leave you with a difficult decision. We consider cars with engine damage, gearbox faults, accident damage and unfinished repairs, so you can find out what yours could sell for in its present condition.",
    "Tell us the model, mileage and known problem for a free, no-obligation valuation. From a 360 or F430 to a 458, California or later model, the enquiry starts with your car's details. You do not have to complete the repair before asking for an offer.",
  ],
  sections: [
    { id: "ferrari-specification", title: "Which Ferrari are you selling?", paragraphs: [
      "The exact version matters. Include the registration, year, model and body style, along with any special specification or modifications. A Spider with a roof fault needs a different assessment from a coupe with engine damage, even when their advertised running-car prices look similar.",
      "Tell us about the transmission and any conversion. Ferrari offered the F430 with a manual or F1 paddle-shift gearbox, while the 458 Italia uses a seven-speed dual-clutch transmission. A description such as 'automatic gearbox problem' can leave important detail missing.",
      "If you are unsure of the specification, start with the registration and the documents you have. You can enquire about an older Ferrari or one with incomplete history; explain the gaps so they can be taken into account.",
    ] },
    { id: "ferrari-gearbox", title: "F1 gearbox, clutch and dual-clutch faults", paragraphs: [
      "A car refusing to engage a gear, dropping into neutral or displaying a gearbox warning is worth describing precisely. Say whether the problem is constant or intermittent, what the dashboard shows and what the workshop has checked. Include a written diagnosis and fault codes if available.",
      "Keep the symptoms separate from the proposed repair. A clutch assessment, an actuator investigation and a quotation for a replacement transmission are different pieces of information. We do not assume that every warning needs the same repair or deduct a standard gearbox allowance from every Ferrari.",
      "If it is stuck in gear or cannot be moved, mention that at the start. The team needs to confirm an appropriate collection plan before a transporter arrives.",
    ] },
    { id: "ferrari-engine", title: "Selling with engine damage or a stalled repair", paragraphs: [
      "We consider non-starting Ferraris and cars with diagnosed engine damage. Send the specialist's findings, the proposed scope of work and photographs of the car as it stands. An engine that has been removed or partly dismantled needs to be described, along with the components included in the sale.",
      "If you have reached the point of deciding whether to authorise more work, obtain an as-is valuation alongside the repair estimate. Our [engine-failure repair-or-sell guide](/blog/supercar-engine-failure-repair-or-sell) explains how to compare the two without relying on a guessed resale price.",
      "Check with the workshop what remains to be done before release, including any reassembly, loose-part packing or agreed charges. Make those arrangements clear when discussing collection.",
    ] },
    { id: "ferrari-damage", title: "Body damage, roof faults and cars kept in storage", paragraphs: [
      "For accident damage, provide an overall view and close photographs of the affected areas. Tell us about damaged suspension or wheels, deployed airbags, missing trim and any known insurance category. Our [Category S and Category N guide](/blog/sell-category-s-n-supercar) explains the information to establish before a sale.",
      "For a Spider or retractable-roof model, describe where the roof stops, whether it closes securely and any water ingress. Include electrical issues and other defects as well as the main reason you are selling.",
      "If the car has been stored, tell us when it last ran, where it has been kept and whether it rolls and steers. A Ferrari that has not moved for some time should be assessed on its current condition. Our [SORN and no-MOT selling guide](/blog/sell-sorn-supercar-without-mot) covers the practical questions that can arise.",
    ] },
    { id: "ferrari-records", title: "History and completeness still matter", paragraphs: [
      "A fault does not make the rest of the car's history irrelevant. Have service invoices, repair reports and details of previous work ready. Mention spare keys, books, tools and original parts that are included, as well as anything missing. You do not need to buy replacement accessories simply to request a valuation.",
      "The offer reflects the specification, mileage, condition, history and work the buyer expects to take on. A low-mileage running example in a dealer advert is not a direct valuation of a damaged car. Our [non-runner value guide](/blog/non-runner-supercar-value) explains how that assessment works.",
      "If you are also considering an auction or commission sale, compare the expected net proceeds, costs and timing with the actual purchase offer. Ask what happens if the car does not sell or an inspection changes the assessment.",
    ] },
    { id: "ferrari-collection", title: "Request a valuation and agree the handover", paragraphs: [
      "Start with the form below. Give the registration, mileage, postcode and contact details, then describe the Ferrari's condition. Photographs and reports can be discussed during the follow-up; say if the car is at a specialist rather than your home.",
      "We buy directly and also work with specialist buyers. Before accepting, confirm the buyer, the agreed price, any inspection conditions, the included parts and the payment and collection arrangements. An enquiry carries no obligation to sell.",
      "Low ground clearance, a steep driveway, a locked wheel or a car on axle stands can change the loading requirements. Describe access accurately and agree suitable transport. Confirm that the agreed payment has cleared before the car leaves.",
    ] },
  ],
  faqs: [
    { question: "Can I sell a Ferrari with a gearbox fault?", answer: "Yes. We consider Ferraris with manual, F1 paddle-shift and dual-clutch transmission faults. Give the model and year, describe the symptoms and share any specialist findings. Tell us if it cannot select neutral." },
    { question: "Do you consider older Ferraris such as the 360 and F430?", answer: "Yes. You can request an assessment of an older Ferrari as well as a later model. Its exact version, condition, completeness and history help determine the offer." },
    { question: "Can I sell if the engine has already been removed?", answer: "You can enquire about a dismantled car. Explain where the engine and removed components are held, what is included and whether the workshop can release them. Collection requirements must be agreed for that condition." },
    { question: "Do I need a complete Ferrari service history?", answer: "You can enquire with incomplete records. Be clear about what you have, what is missing and any known previous work. History is part of the assessment, so gaps may affect the offer." },
    { question: "Do I have to take the car to you for a valuation?", answer: "No. Start with an online enquiry. Further information or inspection may be needed before an offer is finalised, and collection can be arranged once the sale and access requirements are agreed." },
  ],
};
