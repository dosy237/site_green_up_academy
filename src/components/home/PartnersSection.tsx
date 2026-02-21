// React default import not required with new JSX transform
const partners = [
{
  name: 'EDF',
  logo: 'EDF'
},
{
  name: 'Schneider Electric',
  logo: 'SCHNEIDER'
},
{
  name: 'Capgemini',
  logo: 'CAPGEMINI'
},
{
  name: 'Engie',
  logo: 'ENGIE'
},
{
  name: 'Veolia',
  logo: 'VEOLIA'
},
{
  name: 'TotalEnergies',
  logo: 'TOTAL'
},
{
  name: 'BNP Paribas',
  logo: 'BNP'
},
{
  name: 'Orange',
  logo: 'ORANGE'
}];

export function PartnersSection() {
  return (
    <section className="py-20 bg-light-surface dark:bg-dark-surface border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-light-muted dark:text-dark-muted uppercase tracking-wider">
            Ils nous font confiance
          </p>
          <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mt-2">
            +50 entreprises partenaires
          </h3>
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee">
            {[...partners, ...partners].map((partner, index) =>
            <div
              key={index}
              className="flex-shrink-0 mx-8 w-40 h-20 flex items-center justify-center">

                <div className="text-2xl font-bold text-gray-300 dark:text-gray-600 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer">
                  {partner.logo}
                </div>
              </div>
            )}
          </div>

          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-light-surface dark:from-dark-surface to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-light-surface dark:from-dark-surface to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>);

}