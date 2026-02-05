import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Visual-only feedback
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div
            className="text-center mb-12 opacity-0"
            style={{
              animation: isVisible ? "fadeUp 0.6s ease-out forwards" : "none",
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get in <span className="text-primary">Touch</span>
            </h2>
            <p className="text-muted-foreground">
              Ready to transform your business? Let's start a conversation.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 opacity-0"
            style={{
              animation: isVisible ? "fadeUp 0.6s ease-out 0.2s forwards" : "none",
            }}
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="How can we help you?"
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Tell us about your project or inquiry..."
                required
                rows={6}
                className="resize-none"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-lg"
              disabled={isSubmitted}
            >
              {isSubmitted ? (
                <>
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Message Sent!
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}