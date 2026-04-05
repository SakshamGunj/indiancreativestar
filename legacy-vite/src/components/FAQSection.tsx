import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const faqs = [
  {
    question: "What format do I submit in?",
    answer: "For artwork, you can submit a high-quality photo or scan of your work in JPG, PNG, or PDF format. Make sure the image clearly shows all details of your artwork."
  },
  {
    question: "Can kids join?",
    answer: "Yes! Children aged 7 and above can participate. For participants under 18, we require parental consent during registration."
  },
  {
    question: "What if I don't win?",
    answer: "Every participant receives a digital certificate of participation. Additionally, there's still a chance for your work to be featured in our online gallery or social media channels."
  },
  {
    question: "Can I submit multiple artworks?",
    answer: "You can submit up to 3 artworks in a single registration. Additional artworks can also be submitted."
  },
  {
    question: "How are the winners selected?",
    answer: "Entries are judged by a panel of professional artists and educators based on creativity, originality, technique, and interpretation of the theme."
  },
  {
    question: "When will the results be announced?",
    answer: "Results will be announced within 4 weeks after the submission deadline. All participants will be notified via email and WhatsApp."
  }
];

export function FAQSection() {
  return (
    <section className="section-padding bg-muted/20" id="faq">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-2">FAQ</Badge>
          <h2 className="text-4xl font-bold text-gradient mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Get answers to common questions about the Sikkim Creative Star art challenge.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                <AccordionTrigger className="text-lg font-medium hover:text-primary text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
