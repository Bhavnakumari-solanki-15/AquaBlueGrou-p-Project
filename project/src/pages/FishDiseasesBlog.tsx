  import React from 'react';

const FishDiseasesBlog: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-[#2d215b] mb-6">
          FISH DISEASES: SYMPTOMS & TREATMENTS
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          The following points highlight the seven major diseases of fishes.
        </p>

        <div className="mb-8">
          <img 
            src="/images/image11.png" 
            alt="Illustration related to fish diseases"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold text-[#2d215b] mt-8 mb-4">1. Bacterial Diseases of Fishes</h2>
          <p>Bacterial diseases are usually characterized by red streaks or spots and/or swelling of the abdomen or eye.</p>

          <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">1. Red Pest:</h3>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Symptoms:</h4>
          <p>Bloody streaks on body, fins and/or tail appear, so it is called red pest. In severe infection these streaks could lead to ulceration and possibly followed by fin and tail rot with the tail and/or fins falling off.</p>

          <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Treatment:</h4>
          <p>External treatments are usually not effective as the disease is internal.</p>
          <p><strong>At the appearance of disease:</strong></p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Treat the tank with a disinfectant and clean the tank as best as possible.</li>
            <li>To disinfect, use acriflavine (trypaflavine) or monacrin (mono-amino-acridine) using a 0.2% solution at the rate of 1 ml per litre. Both disinfectants will colour the water, but the colour disappears as the disinfectants dissipate.</li>
            <li>Do not feed a lot while the fish is being treated.</li>
            <li>If the fish do not appear to respond favorably, discontinue disinfecting. Then add an antibiotic to the food. 1% of antibiotic may be carefully mixed with flake food. If you keep the fish hungry they should eagerly eat the mixture before the antibiotic dissipates.</li>
          </ol>
          <p className="mt-4">Antibiotics usually available in 250 mg capsules. If added to 25 grams of flake food, one capsule should be enough to treat dozens of fishes. A good antibiotic are Chloromycetin (chloramphenicol) and use tetracycline.</p>

          <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">ii. Mouth Fungus:</h3>
           <h4 className="text-lg font-semibold text-gray-800 mb-2">Symptoms:</h4>
           <p>White cottony patches around the mouth. It looks like a fungus attack of the mouth, so it is called mouth fungus. It is actually caused from the bacterium Chondrococcus columnaris. In the beginning a grey or white line appear around the lips and later short tufts arise from the mouth like fungus. This disease may be fatal due to production of toxins and the inability to eat. Hence treatment at an early stage is essential.</p>

           <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Treatment:</h4>
           <p>Penicillin at 10000 units per litre is a very effective treatment. Second dose should be given in two days, or use Chloromycetin, 10 to 20 mg per litre, with a second dose in two days.</p>

           <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">iii. Tuberculosis:</h3>
           <h4 className="text-lg font-semibold text-gray-800 mb-2">Symptoms:</h4>
           <p>Emaciation, hollow belly, possibly sores. Tuberculosis is caused by the Bacterium Mycobacterium piscium. Fish infected with tuberculosis may become hollow bellied, pale, show skin ulcers and frayed fins, and loss of appetite. Yellowish or darker nodules may appear on the body or eyes. The main cause for this disease appears to be over-crowding in un-kept conditions.</p>

           <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Treatment:</h4>
           <p>There is no known and effective treatment for this disease. The best thing to do is to destroy the infected fish and, if un-kept conditions or overcrowding is the suspected cause, it is required to take necessary measures.</p>

           <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">iv. Dropsy:</h3>
           <h4 className="text-lg font-semibold text-gray-800 mb-2">Symptoms:</h4>
           <p>Bloating of the body, protruding scales. Dropsy is caused from a bacterial infection (acromonas) of the kidneys, causing fluid accumulation or renal failure. The fluids in the body build up and cause the fish to bloat up and the scales to protrude.</p>

           <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Treatment:</h4>
           <p>An effective treatment is to add an antibiotic to the food. With flake food, use about 1% of antibiotic and carefully mix it. Antibiotics in 250 mg capsules if added to 25 grams of flake food will be sufficient to treat dozens of fishes. A good antibiotic is Chloromycetin (chloramphenicol), or use tetracycline.</p>

            <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">v. Scale Protrusion:</h3>
           <h4 className="text-lg font-semibold text-gray-800 mb-2">Symptoms:</h4>
           <p>Protruding scales without body bloat. Bacterial infection of the scales and/or body causes scale protrusion. An effective treatment is to add an antibiotic to the food. With flake food, use about 1% of antibiotic like Chloromycetin (chloramphenicol), or tetracycline.</p>

           <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">vi. Tail Rot & Fin Rot:</h3>
           <h4 className="text-lg font-semibold text-gray-800 mb-2">Symptoms:</h4>
           <p>Disintegrating fins that may be reduced to stumps, exposed fin rays, blood on edges of fins, reddened areas at base of fins, skin ulcers with grey or red margins, cloudy eyes. It is caused by the bacteria Aeromonas. If tank conditions are not good an infection can be caused from a simple injury to the fins/tail. Tuberculosis can lead to tail and fin rot. Basically, the tail and/or fins become frayed or lose colour.</p>

           <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Treatment:</h4>
           <p>Treat the water or fish with antibiotics. A good antibiotic is Chloromycetin (chloramphenicol) or tetracycline. Treatment of 1% CuSO4 is also effective.</p>

           <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">vii. Ulcer:</h3>
           <h4 className="text-lg font-semibold text-gray-800 mb-2">Symptoms:</h4>
           <p>Loss of appetite and slow body movements. It is caused by bacteria, haemophilus.</p>

           <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Treatment:</h4>
           <p>Give dip treatment in 1% CUSO4 for one minute for a period of 3 to 4 days. Antibiotics oxytetracycline and chloramphenicol may be useful in acute infection.</p>

           <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Precautions during Treatment of Bacterial Diseases:</h4>
           <p>Bacterial diseases are best treated by antibiotics such as penicillin, amoxicillin, or erythromycin. The most common parasitic disease called "Ich" can be treated most effectively with copper or malachite green in the right dosage.</p>
           <p>Most medications contain copper as an ingredient. Many water treatments like "Aquari-Sol" will also contain copper as an ingredient. The copper may be harmful to most plants and invertebrates, such as snails. Indeed, most snail removers are copper based.</p>
           <p>Antibiotic may disturb biological filtration in the tank. Therefore, it is also recommended to monitor either ammonia and nitrite levels of water, or use an ammonia remover such as "Am-Quel" to be sure that the level of ammonia does not exceeds the desired limit.</p>


          <h2 className="text-2xl font-semibold text-[#2d215b] mt-8 mb-4">2. Fungal Diseases of Fishes:</h2>

          <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">i. Argulosis:</h3>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Symptoms:</h4>
          <p>Caused due to Argulus (Fish louse). The fish scrapes itself against objects, clamped fins, visible parasites about 1/4 inch in diameter are visible on the body of the fish. The fish louse is a flattened mite-like crustacean about 5 mm long that attaches itself to the body of fish. They irritate the host fish which may have clamped fins, become restless, and may show inflamed areas where the lice have been.</p>

          <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Treatment:</h4>
          <p>With larger fish and light infestations, the lice can be picked off with a pair of forceps. Other cases can best be done with a 10 to 30 minute bath in 10 mg per litre of potassium permanganate or treat the whole tank with 2 mg per liter, but this method is messy and dyes the water.</p>

          <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">ii. Ichthyosporidium:</h3>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Symptoms:</h4>
          <p>Sluggishness, loss of balance, hollow belly, external cysts and sores.</p>
          <p>Ichthyosporidium is a fungus, but it manifests itself internally. It primarily attacks the liver and kidneys, but it spread everywhere else. The symptoms vary. The fish may become sluggish, loosely balanced, show hollow bellies, and eventually show external cysts or sores. By then it is usually too late for the fish.</p>

          <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Treatment:</h4>
          <p>Phenoxethol added to food as a 1% solution may be effective... There is no known cure. It is best to destroy the infected fish and clean the aquarium.</p>

          <h2 className="text-2xl font-semibold text-[#2d215b] mt-8 mb-4">3. Parasitic Diseases in Fishes</h2>
           <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">i. White Spot Disease (Ich):</h3>
           <h4 className="text-lg font-semibold text-gray-800 mb-2">Symptoms:</h4>
           <p>Small white spots on the skin and fins, rapid breathing, flashing against objects.</p>
           <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Treatment:</h4>
           <p>Treat with copper or malachite green. Raise water temperature if suitable for the fish species.</p>

           <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">ii. Flukes:</h3>
           <h4 className="text-lg font-semibold text-gray-800 mb-2">Symptoms:</h4>
           <p>Rapid gill movements, scratching against objects, excess mucus on gills or body, chewed gills.</p>
           <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Treatment:</h4>
           <p>Treat with a dewormer medication. Address secondary bacterial infections if present.</p>


          <h2 className="text-2xl font-semibold text-[#2d215b] mt-8 mb-4">4. Protozoan Diseases in Fishes</h2>

          <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">i. Hexamitiasis (Hole-in-the-Head):</h3>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Symptoms:</h4>
          <p>Small pits on the head and face, progressing to larger cavities, lesions along the lateral line, loss of appetite, emaciation.</p>
          <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Treatment:</h4>
          <p>Treat with metronidazole (Flagyl) in food or water. Improve water quality and diet.</p>

          <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">ii. Oodinium (Velvet Disease):</h3>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Symptoms:</h4>
          <p>Fine, dusty, yellowish-gold coating on skin and fins, rapid breathing, scratching, lethargy.</p>
          <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Treatment:</h4>
          <p>Treat with copper-based medications or acriflavine. Dim the lights as the parasite is photosynthetic.</p>

          <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">iii. Costia (Ichthyobodo):</h3>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Symptoms:</h4>
          <p>Bluish-white cloudy film on skin, rapid breathing, flashing, lethargy.</p>
          <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Treatment:</h4>
          <p>Treat with salt baths, formalin, or malachite green. Improve water quality.</p>

          <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">iv. Chilodonella:</h3>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Symptoms:</h4>
          <p>Blue-white cloudiness on skin, gill damage, weakness, frayed fins.</p>
          <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Treatment:</h4>
          <p>Treat with acriflavine, salt baths, or formalin. Raise temperature if suitable.</p>

          <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">v. Trichodina:</h3>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Symptoms:</h4>
          <p>Grey or white film on skin and gills, flashing, rapid breathing, lethargy.</p>
          <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Treatment:</h4>
          <p>Treat with salt baths, formalin, or potassium permanganate.</p>

          <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">vi. Myxosporidisis (various types including Whirling Disease, Knot Disease, Bio-Disease):</h3>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Symptoms:</h4>
          <p>Can vary widely depending on the specific parasite, including skeletal deformities, blacktail, cysts on skin or internal organs, boils, weakness, scale loss.</p>
          <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Treatment:</h4>
          <p>Treatment is often difficult or ineffective. In many cases, destroying infected fish to prevent spread and improving water quality are recommended. Salt baths or formalin dips may help with some types.</p>

          <h2 className="text-2xl font-semibold text-[#2d215b] mt-8 mb-4">5. Non-Infectious Maladies in Fishes</h2>

          <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">i. Tumours:</h3>
          <p>Usually genetic, can also be caused by viruses or cancer. Untreatable. Destroy fish if in distress.</p>

          <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">ii. Congenital Abnormalities:</h3>
          <p>Often due to excessive hybridization. Untreatable.</p>

          <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">iii. Physical Injuries:</h3>
          <p>Caused by accidents. Treat with disinfectant like 2% mercurochrome. Good water quality helps healing.</p>

          <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">iv. Constipation:</h3>
          <p>Often caused by diet. Symptoms include loss of appetite and swelling. Treat with high-fiber foods or foods soaked in medicinal paraffin oil.</p>

          <h2 className="text-2xl font-semibold text-[#2d215b] mt-8 mb-4">6. Miscellaneous Diseases in Fishes</h2>

          <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">i. Head and Lateral Line Disease (HLLE):</h3>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Symptoms:</h4>
          <p>Small pits on head and face, progressing along the lateral line. Attributed to nutritional deficiencies (Vitamin C, D, calcium, phosphorus), poor diet variety, or excessive chemical filtration.</p>
          <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Treatment:</h4>
          <p>Increase water changes, add vitamins to food, feed flake foods and green vegetables, reduce beef heart in diet.</p>

          <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">ii. Eye Problems:</h3>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Symptoms:</h4>
          <p>Cloudy cornea (bacterial, treat with antibiotics), opaque lens (nutrition, parasites, improve diet), Pop eye (exophthalmia - handling, gas, tumors, bacteria, Vit A deficiency, treat bacterial/gas with penicillin/amoxicillin), blindness (nutrition, light, improve diet and lower light).</p>

          <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">iii. Swim-Bladder Disease:</h3>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Symptoms:</h4>
          <p>Abnormal swimming, difficulty maintaining equilibrium.</p>
          <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Treatment:</h4>
          <p>Often a symptom of other issues (deformity, cancer/TB, constipation, poor nutrition, serious infections). Treat the underlying cause. For buoyancy issues, vet intervention (releasing air) or supportive care like hand-feeding or harnessing may be needed. Improve water quality.</p>

          <h2 className="text-2xl font-semibold text-[#2d215b] mt-8 mb-4">7. Viral Diseases in Fishes</h2>

          <h3 className="text-xl font-semibold text-[#2d215b] mt-6 mb-3">i. Lymphocytis:</h3>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Symptoms:</h4>
          <p>Nodular white swellings (cauliflower) on fins or body. Infectious but usually not fatal.</p>
          <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Treatment:</h4>
          <p>No known cure. Destroy infected fish to prevent spread or isolate for potential remission.</p>

           <h2 className="text-2xl font-semibold text-[#2d215b] mt-8 mb-4">GENERAL DISEASE PREVENTION GUIDELINE FOR THE FISH OWNERS</h2>

            <ul className="list-disc list-inside space-y-2">
                <li><strong>Provide Quality Diet:</strong> Healthy diet is key for good immune system.</li>
                <li><strong>Ensure high water quality:</strong> Clean water reduces stress and disease risk. Monitor parameters.</li>
                <li><strong>Observe the tank routinely:</strong> Watch fish behavior for early signs of stress or sickness.</li>
                <li><strong>Water changes for reducing stress:</strong> Regular partial water changes help. Address bullying or new fish stress.</li>
                <li><strong>Quarantine new fish:</strong> Isolate new fish to prevent introducing diseases.</li>
            </ul>

           <h2 className="text-2xl font-semibold text-[#2d215b] mt-8 mb-4">Conclusion</h2>
           <p>While diseases are inevitable, preventive measures significantly reduce risks. Water quality is paramount. Early detection and treatment are crucial. Consult experts for diagnosis and treatment plans. Maintaining proper water parameters is key to disease prevention.</p>

        </div>
      </div>
    </div>
  );
};

export default FishDiseasesBlog; 