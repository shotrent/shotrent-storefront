import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import Link from "next/link"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"


// We require your registered company address and domestic telephone number in India to be listed on the "Contact Us" or "Support" page on your website.

const PrivacyPolicy: NextPageWithLayout = () => {
    return (
        <>
            <div className="bg-gray-50 py-6 min-h-[calc(100vh-64px)]">
                <div className="content-container flex justify-center">
                    <div className="max-w-4xl h-full bg-white w-full">
                        <div className="p-10 border-b border-gray-200">
                            <Template />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


PrivacyPolicy.getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>
}

export default PrivacyPolicy;

const Template = () => {
    return (<div>
        <h1 className="text-xl font-bold mt-8 mb-4">PRIVACY POLICY</h1>
       
        <p className="mb-4">
          <span>Shotrent</span> is a website owned and operated by SHOTRENT
          TECHNOLOGIES PRIVATE LIMITED a company duly registered and incorporated
          under the Companies Act, 1956, whose address is at JM Tower, Ansari Chowk, Kalyan - 421301,
          Maharashtra, India. Shotrent Technologies PRIVATE LIMITED, is strongly
          committed in protecting your privacy and has taken all necessary and
          reasonable measures to protect your personal information and handle the same
          in a safe and responsible manner in accordance with the terms and conditions
          of this policy (“Privacy Policy”) set out herein below:
        </p>
        <br />
        <p className="mb-4">
          <span>Shotrent</span> (“Website”) is a market place for people to engage in
          subscribing to experience with respect to electronic gadgets across categories 
          such as Cameras, Laptops, Gaming consoles, Home Appliances and Fitness Equipment either
          collectively as a package or individual items by signing a personalized
          contract provided thereunder (hereinafter referred to as Services/Products).
          The information contained in this Website and the personal information
          collected by using/ login and or accessing this Website are stored at a
          secured server. It is stated by the server service provider that they have
          all the best security practices required for the server.The Website is owned
          by an Indian company and is located in India. Hence, we are duty bound to
          abide by the laws, regulations, rules, circulars, notifications etc
          governing privacy in India. This Privacy Policy is applicable to all users
          of this Website. The user is herein collectively referred to as “You”. You
          may note that this Privacy Policy may be found deficient with respect to
          certain privacy laws of some other countries.By visiting this Website you
          agree to be bound by the terms and conditions of this Privacy Policy. If you
          do not agree please do not use or access our Website. By mere use of the
          Website, you expressly consent to our use and disclosure of your personal
          information in accordance with this Privacy Policy
        </p>
        <p className="text-xl font-bold mt-8 mb-4">1. Collection of Personal Information:</p>
        <p className="mb-4">
          For availing the Services/Products from the Website or to contact Shotrent,
          you may have to sign up by giving following personal information such as
          email address, name, phone number and address. Some of these information
          provided above are personally sensitive information (“Personal Information”)
          and is collected for the purpose of verification of identity of the user and
          to ensure due compliances. We do use your contact information to send you
          offers based on your previous orders and your interests. In general, you can
          browse the Website without telling us who you are or revealing any Personal
          Information about yourself.Additionally if you browse through this Website,
          our servers may automatically record information of certain kind. Such
          information includes information such as the name of the domain and host
          from which you access the Internet; the Internet Protocol (IP) address of
          the computer you are using; the date and time of your access. We use this
          information to monitor the usage of our Website and also whatever is
          necessary for our business. This information does not include Personal
          Information.If you choose to post messages on our message boards, chat rooms
          or other message areas or leave feedback, we will collect that information
          you provide to us. We retain this information as necessary to resolve
          disputes, provide customer support and troubleshoot problems as permitted by
          law. If you send us personal correspondence, such as emails or letters, or
          if other users or third parties send us correspondence about your activities
          or postings on the Website, we may collect such information into a file
          specific to you.
          <br />
          <br />
          Authorization via Gmail provides you the option to share certain information
          with us, including your name, email address, and access to your email inbox
          and calendar in read-only mode, which you can revoke at any time. We may use
          this information for data analytics purposes but stay assured as your
          identity will remain highly anonymous.
        </p>
        <p className="text-xl font-bold mt-8 mb-4">2. Information collected from third party:</p>
        <p className="mb-4">
          We may collect your Personal Information as well as other information from
          third parties like business partners; contractors; vendors etc and add the
          same to our account information.
        </p>
        <p className="text-xl font-bold mt-8 mb-4">3. Information placed on your computer:</p>
        <p className="mb-4">
          We may store some information such as cookies on your computer. Cookies are
          pieces of information that an application transfers to the hard drive of a
          visitors computer for record-keeping purposes. This information facilitates
          your use of Website and ensures that you do not need to re-enter your
          details every time you visit it. You can erase or choose to block this
          information from your computer if you want to. Erasing or blocking such
          information may limit the range of features available to the visitor on
          Website. We also use such information to provide visitors a personalized
          experience on Website. We may use such information to allow visitors to use
          Website without logging in upon returning.
        </p>
        <p className="text-xl font-bold mt-8 mb-4">4. Information collected from your mobile device:</p>
        <div>
          <ul>
            <li>
              <b>(a)&nbsp;Personal Information:</b> All the information that we
              collect is related to provide Shotrent's services features. We never
              receive any information unless you expressly choose to share it with us.
              Some examples of your personal information collected are Full-Name,
              Mobile Number, Delivery Address etc.
            </li>
            <li>
              <b>(b)&nbsp;Contacts:</b> We use this to avoid any errors when entering
              the Mobile number of your choice for taking delivery. You can also use
              this to share your favorite Shotrent products with your friends and
              family. We will never import or scan your contacts unless you ask us to.
            </li>
            <li>
              <b>(c)&nbsp;Phone state:</b> We access read only information to phone
              state including phone number, device network. This allows us to provide
              you with a seamless experience and a higher caliber of customer service.
            </li>
            <li>
              <b>(d)&nbsp;Location:</b> It is used strictly to show you availability
              of product stock in your area as well as deliver your order to your
              exact address. We will never gather or use your specific device location
              without first getting your explicit permission.
            </li>
            <li>
              <b>(e)&nbsp;Camera:</b> This allows you to choose individual pictures to
              change your user profile picture or easy upload of your documents for
              KYC purposes as per RBI (Reserve Bank of India) guidelines 2022. We will
              only access images that you specifically choose, and we will never scan
              or import your photo library or camera roll. You can stop sharing photos
              and revoke access at any time.
            </li>
          </ul>
        </div>
        <p className="text-xl font-bold mt-8 mb-4">5. Links:</p>
        <p className="mb-4">
          Our Website may contain links to other sites. Such other sites may use
          information about your visit to this Website. Our Privacy Policy does not
          apply to practices of such sites that we do not own or control or to people
          we do not employ. Therefore, we are not responsible for the privacy
          practices or the accuracy or the integrity of the content included on such
          other sites. We encourage you to read the individual privacy statements of
          such websites.
        </p>
        <p className="text-xl font-bold mt-8 mb-4">6. Use of Personal Information:</p>
        <p className="mb-4">
          Website collects and uses your Personal Information to provide you better
          customer experience and also in the administration of our business. Website
          may use your Personal Information to administer this service, personalize
          the Website services for you enable your access to and use of Website
          services publish information about you on Website to keep you informed or
          update you on various products and services available from Website send you
          statements and invoices collect payments from you send you marketing
          communications to send you mails or contact you for various customer
          satisfaction surveys, market research, promotional activities or in
          connection with certain transactions make communications necessary to notify
          you regarding various security, privacy, and administrative issues to
          respond to your queries send you information that may be of interest to you,
          share this information with Services/Products made available through Website
          to respond to any of your legitimate claim, or to address you if we have
          reasonable belief, that you are violating the rights of any third party or
          any of the agreements or policies that govern your use of Website
          Services/Products conduct research and perform analysis in order to measure,
          maintain, protect, develop and improve our services.Website has no
          operations in other countries and we do not transfer Personal Information to
          other countries. However, if the server space provider as matter of backup
          or other general practices may transfer the server content between any of
          the countries in which server provider operates or servers are located to
          enable the use of the information in accordance with this Privacy Policy,
          You agree to such cross-border transfers of Personal Information and the
          risk associated with it.Where Website discloses your Personal Information to
          any third party for any purpose mentioned above, such third parties are
          obligated to use that Personal Information in accordance with the terms of
          this Privacy Policy.In addition to the disclosures reasonably necessary for
          the purposes identified above, Website may disclose your Personal
          Information to the extent that it is required to do so by law, in connection
          with any legal proceedings or prospective legal proceedings, and in order to
          establish, exercise or defend its legal rights. Shotrent shall provide the
          services under the Agreement, either by itself or through any third-party.
          In case the services are required to be provided through any third-party,
          Shotrent shall share the details (only to the extent required to provide the
          services) of the Customer to enable such third-party to provide the service.
          The Customer hereby authorises Shotrent to share the details of the Customer
          with such third party.
        </p>
        <p className="text-xl font-bold mt-8 mb-4">7. Personal Information that we share:</p>
        <p className="mb-4">
          We are committed in protecting the privacy and security of your information.
          At no time will we sell your Personal Information without your permission
          unless set forth in this Privacy Policy to third parties. The information we
          receive about you or from you may be used by us or shared by us with our
          corporate affiliates, dealers, agents, vendors and other third parties.We do
          not share, sell, trade or rent your Personal Information to third parties
          for unknown reasons. We retain complete anonymity while in all analytics and
          none of the Personal Information is used, except in a limited set of
          circumstances as stated below. We safeguard your email addresses. We dont
          sell the email addresses provided by you and we use them only as directed by
          you and in accordance with this Policy.
        </p>
        <p className="text-xl font-bold mt-8 mb-4">8. We share your Personal Information as described below:</p>
        <p className="mb-4">
          Business Transfers: If we start up subsidiaries or get involved in mergers
          or acquisitions. In such case your Personal Information may be the matter of
          transfer. And we will provide notice on any such transfer and become subject
          to different privacy policy.
        </p>
        <p className="text-xl font-bold mt-8 mb-4">9. DND Waiver:</p>
        <p className="mb-4">
          You agree and authorize the Company to use and share your information with
          its contractors and other third parties, in so far as required for joint
          marketing purposes/offering various services/report generations and/or to
          similar services to provide you with various value-added services, in
          association with the Services selected by you or otherwise. You agree to
          receive communications through emails, telephone and/or sms, from the
          Company including its contractors or its third-party vendors regarding the
          Services/ancillary services updates, information/promotional emails and/or
          product announcements. In this context, you agree and consent to receive all
          communications at the mobile number provided, even if this mobile number is
          registered under DND/NCPR list under TRAI regulations, and for such purpose,
          you further authorize Company to share/disclose the information to its
          contractors or any third-party service provider.
        </p>
        <p className="text-xl font-bold mt-8 mb-4">10. Our commitment to Personal Information security:</p>
        <p className="mb-4">
          We recognize that your privacy is important to you, and therefore we
          endeavor to keep your Personal Information confidential. We will take
          reasonable technical and organizational precautions to prevent the loss,
          misuse or alteration of your Personal Information. We assure you of our best
          effort to protect Personal Information, HOWEVER,WE DO NOT REPRESENT,
          WARRANT, OR GUARANTEE THAT YOUR PERSONAL INFORMATION WILL BE PROTECTED
          AGAINST UNAUTHORIZED ACCESS, LOSS, MISUSE, OR ALTERATIONS, AND DO NOT ACCEPT
          ANY LIABILITY FOR THE SECURITY OF THE PERSONAL INFORMATION SUBMITTED TO US
          NOR FOR YOUR OR THIRD PARTIES USE OR MISUSE OF PERSONAL INFORMATION.
        </p>
        <p className="text-xl font-bold mt-8 mb-4">11. Payment Gateway:</p>
        <p className="mb-4">
          Information relating to electronic transactions entered into via the Website
          shall be protected by encryption technology. We have partnered with secure
          payment gateways i.e. Paytm gateway, Razorpay and Instamojo. The Website
          does not have the ability to interfere and do not interfere with the payment
          gateway mechanism. The Website has no access to the information that you may
          enter for making the payment through the payment gateway. Your transaction
          and banking details or other information as required for internet banking or
          other payment instruments is held by our Payment Gateway partner.By creating
          a link to a payment gateway, we do not endorse the payment gateway, nor are
          we liable for any failure of products or services offered by such payment
          gateway. Such payment gateway may have a privacy policy different from that
          of ours. All failures/ errors/ omissions of the payment gateway shall be
          solely on the payment gateway. You hereby consent that you shall not sue the
          Website for any disputes that you may have with the payment gateway for any
          wrong doing of the payment gateway.
        </p>
        <p className="text-xl font-bold mt-8 mb-4">12. Security:</p>
        <p className="mb-4">
          We safeguard your privacy using known security standards and procedures and
          comply with applicable privacy laws. Our Website combines industry-approved
          physical, electronic and procedural safeguards to ensure that your
          information is well protected through its life cycle in our infrastructure.
          Personal Information is hashed or encrypted when it is stored in our
          infrastructure. Personal Information is decrypted, processed and immediately
          re-encrypted or discarded when no longer necessary.
        </p>
        <p className="text-xl font-bold mt-8 mb-4">13. Opt-Out Policy:</p>
        <p className="mb-4">
          Please email us at
          <a href="mailto:info@shotrent.in" target="_blank" rel="noopener">
            info@shotrent.in
          </a>
          if you no longer wish to receive any information from us.
        </p>
        <p className="text-xl font-bold mt-8 mb-4">14. Changes to the Privacy Policy:</p>
        <p className="mb-4">
          We reserve the right to modify this Privacy Policy and it is subject to
          change at any time without notice. If we decide to change our Privacy
          Policy, such changes will be posted on Website so that you are always aware
          of the latest amendments in this Privacy Policy and please review this
          Policy periodically.
        </p>
        <p className="text-xl font-bold mt-8 mb-4">15. About this Privacy Policy:</p>
        <p className="mb-4">
          If you choose to visit our Website, your visit and any dispute over privacy
          is subject to this Privacy Policy and Terms of Use. The terms of this
          Privacy Policy do not govern Personal Information furnished through any
          means other than the Website.If you have any questions about this Privacy
          Policy or Website treatment of your Personal Information, please write to
          <a href="mailto:info@shotrent.in" target="_blank" rel="noopener">
            info@shotrent.in
          </a>
        </p>
        <p className="text-xl font-bold mt-8 mb-4">16. Grievances:</p>
        <p className="mb-4">
          If you have any grievances against the Website privacy practices, or you
          apprehend that your privacy is compromised at the Website, please address
          your complaint/ concerns to
          <a href="mailto:info@shotrent.in" target="_blank" rel="noopener">
            info@shotrent.in
          </a>
          . We assure, we shall pro-actively address your concerns.All disputes
          between us and you in this regard are subject to exclusive jurisdiction of
          Maharashtra courts.
        </p>
      </div>
      )
}