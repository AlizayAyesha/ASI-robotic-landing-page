"use client";

import React, { memo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  message: string;
  interests: string[];
}

interface ValidationErrors {
  [key: string]: string;
}

const interestOptions = [
  "Web Development",
  "AI/ML",
  "Cybersecurity",
  "Mobile Apps",
  "Blockchain",
  "UI/UX Design",
];

const quickContacts = [
  {
    name: "alizay Ayesha",
    role: "Founder & CEO",
    email: "alizayyousfzai@gmail.com",
    phone: "+92 300 1234567",
  },
];

const Contact = memo(() => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    interests: [],
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const terminalRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Validation functions
  const validateField = (field: keyof FormData): string => {
    const value = formData[field];

    switch (field) {
      case "name":
        if (!value || typeof value !== "string")
          return "ERROR: Name is required";
        if (value.trim().length < 2)
          return "ERROR: Name must be at least 2 characters";
        return "";

      case "email":
        if (!value || typeof value !== "string")
          return "ERROR: Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "ERROR: Invalid email format";
        return "";

      case "interests":
        if (!Array.isArray(value) || !value.length)
          return "ERROR: Select at least one interest";
        return "";

      case "message":
        if (!value || typeof value !== "string")
          return "ERROR: Message is required";
        if (value.trim().length < 10)
          return "ERROR: Message must be at least 10 characters";
        return "";

      default:
        return "";
    }
  };

  const validateCurrentStep = (): boolean => {
    const currentField = ["name", "email", "interests", "message"][
      currentStep
    ] as keyof FormData;
    const error = validateField(currentField);

    if (error) {
      setErrors((prev) => ({ ...prev, [currentField]: error }));
      return false;
    }

    setErrors((prev) => ({ ...prev, [currentField]: "" }));
    return true;
  };

  // Scroll to the bottom of terminal when new content is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [currentStep, submitted, errors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before final submission
    const allErrors: ValidationErrors = {
      name: validateField("name"),
      email: validateField("email"),
      interests: validateField("interests"),
      message: validateField("message"),
    };

    if (Object.values(allErrors).some((error) => error)) {
      setErrors(allErrors);
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
    setErrors({});

    setTimeout(() => {
      setSubmitted(false);
      setCurrentStep(0);
      setFormData({
        name: "",
        email: "",
        message: "",
        interests: [],
      });
    }, 3000);
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !isSubmitting) {
      e.preventDefault();

      if (currentStep < 3) {
        if (validateCurrentStep()) {
          setCurrentStep((prev) => prev + 1);
        }
      } else {
        if (validateCurrentStep()) {
          handleSubmit(e as unknown as React.FormEvent);
        }
      }
    }
  };

  const renderPrompt = () => {
    const prompts = [
      { label: "name", value: formData.name },
      { label: "email", value: formData.email },
      { label: "interests", value: formData.interests.join(", ") },
      { label: "message", value: formData.message },
    ];

    return prompts.map((prompt, index) => (
      <div
        key={prompt.label}
        className={`mb-4 ${index > currentStep ? "hidden" : ""}`}
      >
        <div className="flex items-center text-[var(--matrix-color)] mb-1">
          <span className="mr-2">root@startsaas:~$</span>
          <span>enter_{prompt.label === "name" ? "company" : prompt.label}</span>
          {prompt.label === "interests" && (
            <span className="ml-2 text-[var(--matrix-color-70)] text-sm">
              (Click to select, ENTER when done)
            </span>
          )}
        </div>
        {index === currentStep && !submitted ? (
          <>
            <div className="flex items-center">
              <span className="text-[var(--matrix-color-70)]">{"> "}</span>
              {prompt.label !== "interests" ? (
                <input
                  type={prompt.label === "email" ? "email" : "text"}
                  value={prompt.value}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [prompt.label]: e.target.value,
                    }))
                  }
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-transparent border-none outline-none text-[var(--matrix-color)] ml-2 font-mono"
                />
              ) : (
                <div className="flex-1">
                  <div
                    className="flex flex-wrap gap-2 mt-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !isSubmitting) {
                        e.preventDefault();
                        if (validateCurrentStep()) {
                          setCurrentStep((prev) => prev + 1);
                        }
                      }
                    }}
                    tabIndex={0}
                  >
                    {interestOptions.map((interest, i) => (
                      <button
                        key={interest}
                        onClick={(e) => {
                          e.preventDefault();
                          handleInterestToggle(interest);
                        }}
                        type="button"
                        className={`px-2 py-1 font-mono text-sm ${
                          formData.interests.includes(interest)
                            ? "text-black bg-[var(--matrix-color)]"
                            : "text-[var(--matrix-color)] border border-[var(--matrix-color-30)]"
                        } hover:border-[var(--matrix-color)]`}
                      >
                        [{i + 1}] {interest}
                      </button>
                    ))}
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => {
                      if (validateCurrentStep()) {
                        setCurrentStep((prev) => prev + 1);
                      }
                    }}
                    className="mt-4 py-2 px-4 bg-[var(--matrix-color-30)] text-[var(--matrix-color)] border border-[var(--matrix-color-30)] rounded hover:bg-[var(--matrix-color)] hover:text-black transition-all duration-300 font-mono text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    $ continue --next-step
                  </motion.button>
                </div>
              )}
            </div>
            {errors[prompt.label] && (
              <div className="mt-2 text-red-500 font-mono">
                <span className="mr-2">!</span>
                {errors[prompt.label]}
              </div>
            )}
          </>
        ) : index < currentStep ? (
          <div className="text-[var(--matrix-color-70)] font-mono">
            <span className="mr-2">{">"}</span>
            {prompt.value || "[empty]"}
          </div>
        ) : null}
      </div>
    ));
  };

  return (
    <section className="relative overflow-hidden pt-20 sm:pt-24">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent">
              Initialize Connection
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto px-4">
            $ ./connect.sh --protocol=secure --target=startup_network
          </p>
        </motion.div>

        {/* Quick Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          {quickContacts.map((contact, index) => (
            <motion.div
              key={contact.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/30 backdrop-blur-sm border border-[var(--matrix-color-30)] rounded-lg p-4 hover:border-[var(--matrix-color)] transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[var(--matrix-color)]">$</span>
                <h3 className="text-[var(--matrix-color)] font-bold">
                  {contact.name}
                </h3>
              </div>
              <p className="text-[var(--matrix-color-70)] text-sm mb-3">
                {contact.role}
              </p>
              <div className="space-y-2 text-sm">
                <motion.a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 text-[var(--matrix-color-70)] hover:text-[var(--matrix-color)] transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <span>{">"}</span>
                  <span className="font-mono">{contact.email}</span>
                </motion.a>
                <motion.a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-2 text-[var(--matrix-color-70)] hover:text-[var(--matrix-color)] transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <span>{">"}</span>
                  <span className="font-mono">{contact.phone}</span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>



        <div className="max-w-3xl mx-auto pb-20 sm:pb-24 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black/50 backdrop-blur-sm border border-[var(--matrix-color-30)] rounded-lg p-4 sm:p-6"
          >
            <div
              ref={terminalRef}
              className="font-mono text-sm sm:text-base overflow-y-auto max-h-[60vh] sm:max-h-[70vh]"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[var(--matrix-color)]"
                >
                  <div className="mb-2">
                    <span className="mr-2">root@startsaas:~$</span>
                    <span>submit_form</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--matrix-color-70)]">{">"}</span>
                    <span className="text-green-500">
                      Form submitted successfully! We&apos;ll get back to you
                      soon.
                    </span>
                  </div>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-2 sm:space-y-4"
                >
                  {renderPrompt()}
                  {currentStep === 3 && (
                    <div className="mt-4 sm:mt-6">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 sm:py-3 px-4 sm:px-6 bg-[var(--matrix-color)] text-black font-bold rounded-lg hover:bg-[var(--matrix-glow)] transition-colors ${
                          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        whileHover={isSubmitting ? {} : { scale: 1.02 }}
                        whileTap={isSubmitting ? {} : { scale: 0.98 }}
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </motion.button>
                      <p className="text-[var(--matrix-color-70)] text-xs sm:text-sm mt-2 text-center">
                        Press ENTER or click the button to submit
                      </p>
                    </div>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";

export default Contact;
