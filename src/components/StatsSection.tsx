
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter } from "./AnimatedCounter";

export function StatsSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-2">Our Impact</Badge>
          <h2 className="text-4xl font-bold text-gradient mb-4">Making a Creative Difference</h2>
          <p className="text-muted-foreground">
            India's Creative Star is more than just a contest. We're building a community of talented artists and poets across the nation.
          </p>
        </div>
        
        <Card className="creative-card p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <AnimatedCounter
              endValue={10214}
              label="Participants"
              prefix="+"
            />
            <AnimatedCounter
              endValue={138}
              label="Creative Workshops"
            />
            <AnimatedCounter
              endValue={3200000}
              label="Prize Money"
              prefix="₹"
              suffix="+"
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
