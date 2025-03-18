import { FC } from "react";
export const FaqView: FC = ({}) => {
  const questions = [
    {
      question: " Who are produces sit pleasure?",
      answer:
        " Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      id: "faq-1",
    },
    {
      question: " What is quo voluptas nulla pariatur?",
      answer:
        "Vivamus elementum semper nisi. Aenean vulputate eleifendtellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.",
      id: "faq-2",
    },
    {
      question: "How to do transactions using iMbank?",
      answer:
        " Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      id: "faq-3",
    },
    {
      question: " hot to activate iMbank service?",
      answer:
        "Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      id: "faq-4",
    },
    {
      question: "  Who is eligible to open iMbank account?",
      answer:
        "Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      id: "faq-5",
    },
    {
      question: "wil i be given a passbook?",
      answer:
        "Aenean commodo ligula eget dolor. Aenean massa. Cum sociisnatoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      id: "faq-6",
    },
  ];

  return (
    <section id="faq" className="py-20">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="mb-4 text-3xl font-medium text-white capitalize">
              Any Question
            </h2>
            <p className="text-sm font-medium text-default-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
              aspernatur vero ad rem quis eius!
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4 hs-accordion-group ">
            {questions.map((question, index) => (
              <div
                key={index}
                className={`hs-accordion bg-default-950/40 overflow-hidden rounded-lg border border-white/10 backdrop-blur-3xl`}
                id={question.id}
              >
                <button
                  className="inline-flex items-center justify-between px-6 py-4 text-left text-white capitalize transition-all hs-accordion-toggle gap-x-3"
                  aria-controls={`faq-accordion-${index + 1}`}
                >
                  <h5 className="flex text-base font-semibold">
                    <i className="w-5 h-5 align-middle me-3 stroke-white"></i>
                    {question.question}
                  </h5>
                  <i className="w-4 h-4 transition-all duration-500 hs-accordion-active:-rotate-180"></i>
                </button>

                <div
                  id={`faq-accordion-${index + 1}`}
                  className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                  aria-labelledby={question.id}
                >
                  <div className="px-6 pt-0 pb-4">
                    <p className="mb-2 text-sm font-medium text-deafult-300">
                      {question.answer}
                    </p>

                    <p className="text-sm font-medium text-default-300 ">
                      Have you ever wanted to become blockchain developer check
                      the pro NFT Marketplace Coursre
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
