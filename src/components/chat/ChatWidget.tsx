'use client'

import { useState, useEffect, useRef } from 'react'

// ============================================================
// SYSTEME DE DETECTION INTELLIGENT PAR MOTS-CLES
// ============================================================

const detectIntent = (text: string): string | null => {
  const t = text.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['']/g, "'")

  // Suivi commande
  if (/(suivi|commande|numero|n°|ou est|tracking|livree|expedie|colis|recu|arrive|statut|etat commande)/.test(t))
    return 'suivi'

  // Delais
  if (/(delai|livraison|temps|combien de temps|quand|rapidement|urgent|vite|date|semaine|jour|rapide)/.test(t))
    return 'delais'

  // Personnalisation
  if (/(personnali|prenom|couleur|theme|police|texte|modifier|changer|custom|sur mesure|adapte|creer|creation|design|maquette|apercu)/.test(t))
    return 'personnalisation'

  // Tarifs et devis
  if (/(tarif|prix|devis|combien|cout|budget|euro|gratuit|offre|remise|reduction|promotion|lot|groupe|quantite|commande groupee)/.test(t))
    return 'devis'

  // Produits specifiques
  if (/(kinder|nutella|haribo|m&m|smartie|bonbon|confiserie|chips|pop corn|popcorn|dragibus|sweet table|table sucree|buffet|gourmandise)/.test(t))
    return 'confiseries'

  if (/(etiquette|bouteille|capri|champomy|coca|canette|boisson|label|autocollant|sticker)/.test(t))
    return 'etiquettes'

  if (/(boite|box|pyramide|cadeau|emballage|packaging|sac|pom pote|plateau)/.test(t))
    return 'boites'

  if (/(tshirt|t-shirt|textile|flocage|vêtement|vetement|polo|sweat|hoodie|planche|thermocollant)/.test(t))
    return 'textile'

  if (/(tasse|mug|gourde|sublimation|objet|cadre)/.test(t))
    return 'objets'

  if (/(faire.part|invitation|menu|marque.place|programme|papeterie|flyer|carte de visite|bristol)/.test(t))
    return 'papeterie'

  if (/(mariage|marie|noce|ceremonie|fiancaille|enterrement vie|evjf|evg)/.test(t))
    return 'mariage'

  if (/(bapteme|naissance|bebe|nouveau.ne|parrain|marraine|bautizo)/.test(t))
    return 'bapteme'

  if (/(anniversaire|anniv|birthday|fete|celebration|adulte|enfant|gouter)/.test(t))
    return 'anniversaire'

  if (/(ramadan|aid|eid|mois sacre|iftar|mubarak)/.test(t))
    return 'ramadan'

  if (/(professionnel|entreprise|marque|logo|salon|evenement pro|corporate|business|flyer pro|carte de visite)/.test(t))
    return 'pro'

  if (/(contact|email|telephone|appel|whatsapp|instagram|reseaux|dm|message|joindre|parler|humain|anais)/.test(t))
    return 'contact'

  if (/(oui|yes|ok|bien sur|volontiers|exactement|tout a fait|parfait|daccord|je veux|je souhaite|merci)/.test(t))
    return 'confirmation'

  if (/(non|pas vraiment|pas besoin|merci non|ca va|je vais voir|plus tard)/.test(t))
    return 'refus'

  return null
}

// ============================================================
// BASE DE REPONSES COMPLETES
// ============================================================

const RESPONSES: Record<string, string[]> = {
  'Suivi de commande': [
    "Je vais vous aider pour le suivi de votre commande ! Pouvez-vous me donner votre numero de commande (format JCD-XXXX) ou votre adresse email de commande ?",
  ],
  suivi_email: [
    "Merci ! Je transmets votre demande a Anais immediatement. Vous recevrez une reponse sous 2h pendant les horaires d'ouverture (Lun-Ven 7h-19h, Week-end 10h-17h). Vous pouvez aussi suivre votre commande depuis votre espace client sur le site.",
  ],
  'Delais de livraison': [
    "Voici nos delais : apres validation de votre commande, vous recevez votre apercu maquette sous 24h. Apres validation de l'apercu, la creation et livraison prennent 5 a 10 jours ouvres. Avez-vous une date d'evenement precise ?",
  ],
  delais_date: [
    "Parfait ! Avec cette date nous avons largement le temps. C'est pour quel type d'evenement ? (mariage, bapteme, anniversaire, professionnel...)",
  ],
  delais_type: [
    "Super ! Pour combien de personnes environ ? Ca m'aide a vous orienter vers les bons produits.",
  ],
  delais_nombre: [
    "Tres bien ! Souhaitez-vous que je vous prepare un devis personnalise ? Anais vous le fera sous 24h.",
  ],
  delais_devis_oui: [
    "Parfait ! Laissez-moi votre adresse email pour qu'Anais puisse vous recontacter.",
  ],
  delais_email_final: [
    "Merci ! Votre demande a bien ete transmise. Anais vous contacte sous 24h avec votre devis personnalise. A tres bientot !",
  ],
  'Personnalisation': [
    "Tous nos produits sont 100% personnalisables ! Prenom, couleurs, theme, police d'ecriture, texte... tout est sur mesure. C'est pour quel evenement ?",
  ],
  perso_type: [
    "Excellent choix ! Vous avez deja un theme ou des couleurs en tete ? (ex: champetre, tropical, pastel, moderne, gold, boheme, minimaliste...)",
  ],
  perso_theme: [
    "J'adore ! Anais va vous creer une maquette unique. Apres votre commande vous recevez un apercu sous 24h avec possibilite de retouches. Quelle date evenement avez-vous ?",
  ],
  perso_date: [
    "Parfait ! Pour vous envoyer des exemples et commencer votre creation, j'ai besoin de votre email.",
  ],
  perso_email_final: [
    "Merci beaucoup ! Anais va vous preparer des exemples personnalises selon vos souhaits et vous les enverra sous 24h. On a hate de sublimer votre evenement !",
  ],
  'Tarifs & Devis': [
    "Voici un apercu de nos tarifs : confiseries personnalisees a partir de 1 euro, boites et emballages a partir de 2,30 euros, tasses et gourdes de 20 a 25 euros, t-shirts de 25 a 30 euros. C'est pour quel type de projet ?",
  ],
  devis_type: [
    "Pour les commandes groupees (mariage, bapteme...) nous faisons des tarifs speciaux ! Combien de personnes attendez-vous ?",
  ],
  devis_nombre: [
    "Quels produits vous interessent ? Je peux vous donner les prix exacts. (confiseries, etiquettes, boites, tasses, t-shirts, papeterie, sweet table...)",
  ],
  devis_produits: [
    "Pour vous faire un devis precis avec les meilleures options, laissez-moi votre email. Anais vous repondra sous 24h.",
  ],
  devis_email_final: [
    "Parfait ! Votre demande de devis a ete transmise. Vous recevrez un devis personnalise sous 24h a votre adresse. Merci de votre confiance !",
  ],
  confiseries: [
    "Nos confiseries personnalisees sont parfaites pour les sweet tables et cadeaux invites ! Voici nos produits : Kinder Maxi (2,50 euros), Mini Nutella (2,70 euros), Haribo (2,80 euros), M&Ms et Smarties (3,00 euros), Sachet bonbons (2,50 euros). Tout est personnalise a votre theme ! C'est pour quel evenement ?",
  ],
  etiquettes: [
    "Nos etiquettes personnalisees sont tres populaires ! Etiquette bouteille eau (1 euro), Capri-Sun (1,50 euro), Canette Coca (1,80 euro), Champomy (2,50 euros). Parfait pour les tables enfants et les buffets ! Quel est votre theme ?",
  ],
  boites: [
    "Nos boites et emballages : Box Pyramide (2,99 euros), Boite Pom Potes (2,30 euros), Pop Corn (2,50-5,50 euros), Sac cadeau (2,90 euros), Plateau confiserie et Boite cadeau sur devis. C'est pour combien de personnes ?",
  ],
  textile: [
    "Pour le flocage textile : T-shirt personnalise de 25 a 30 euros selon la taille, planche etiquette thermocollante sur devis. On peut imprimer votre prenom, logo, design... Vous avez un visuel en tete ?",
  ],
  objets: [
    "Nos objets personalises : Tasse (20 euros), Gourde (25 euros), Cadre personnalise (15 euros). La sublimation permet des impressions haute qualite qui durent. C'est pour offrir ou pour vous ?",
  ],
  papeterie: [
    "Notre papeterie evenementielle est entierement sur mesure ! Faire-parts, invitations, menus, marque-places, programmes, stickers... Prix sur devis selon les quantites. Vous avez une date d'evenement ?",
  ],
  mariage: [
    "Felicitations pour votre mariage ! Nous adorons habiller les tables de mariage. Nos specialites : faire-parts, menus, marque-places, etiquettes boissons, confiseries assorties, sweet table complete. Combien d'invites attendez-vous ?",
  ],
  bapteme: [
    "Quel beau projet pour ce bapteme ! Nous creeons des collections completes assorties : faire-parts, etiquettes, boites dragees, confiseries personnalisees, cadeaux invites. C'est pour un petit garcon ou une petite fille ?",
  ],
  anniversaire: [
    "Super ! Pour un anniversaire nous pouvons tout assortir au theme choisi : etiquettes boissons, boites confiseries, stickers, banderoles, sweet table... C'est pour quel age et quel theme ?",
  ],
  ramadan: [
    "Pour Ramadan et Aid nous avons des collections speciales ! Boites de confiseries, plateaux, emballages cadeaux, etiquettes... tout personnalise aux couleurs de la fete. Vous avez un theme couleur en tete ?",
  ],
  pro: [
    "Pour les professionnels nous proposons flyers, cartes de visite, stickers logo, t-shirts et tenues personnalisees, objets publicitaires... Tout sur devis selon les quantites. C'est pour quel secteur d'activite ?",
  ],
  contact: [
    "Vous pouvez joindre Anais directement : Email : contact@jayscreationsdesign.fr | Tel : 07 49 07 28 61 | Instagram : @jays_creations_design | Horaires : Lun-Ven 7h-19h, Week-end 10h-17h. Puis-je vous aider avec autre chose ?",
  ],
  confirmation: [
    "Parfait ! Pour finaliser, j'ai besoin de votre adresse email pour qu'Anais puisse vous recontacter.",
  ],
  refus: [
    "Pas de probleme ! N'hesitez pas a revenir si vous avez des questions. Vous pouvez aussi nous contacter directement sur Instagram @jays_creations_design. Bonne journee !",
  ],
  fallback: [
    "Merci pour votre message ! Pour vous aider au mieux, choisissez un sujet :",
    "Je ne suis pas sure de comprendre. Voulez-vous que je vous mette en contact directement avec Anais ?",
    "Anais sera ravie de vous repondre personnellement ! Vous pouvez la joindre a contact@jayscreationsdesign.fr ou sur Instagram @jays_creations_design",
  ],
}

// ============================================================
// LOGIQUE DE CONVERSATION AVEC MEMOIRE DE CONTEXTE
// ============================================================

type ChatState = {
  lastIntent: string | null
  step: number
  data: Record<string, string>
  fallbackCount: number
}

const getNextResponse = (
  userMessage: string,
  state: ChatState
): { response: string; newState: ChatState } => {

  const t = userMessage.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['']/g, "'")

  let newState = { ...state, data: { ...state.data } }

  // Collecte automatique email
  if (userMessage.includes('@') && userMessage.includes('.')) {
    newState.data.email = userMessage
  }

  // Collecte date
  const dateMatch = t.match(
    /(\d{1,2})[\/\-\s](janvier|fevrier|mars|avril|mai|juin|juillet|aout|septembre|octobre|novembre|decembre|\d{1,2})/
  )
  if (dateMatch) newState.data.date = userMessage

  // Collecte nombre personnes
  const nombreMatch = t.match(/(\d+)\s*(personne|invite|convive)?/)
  if (nombreMatch && parseInt(nombreMatch[1]) > 1) {
    newState.data.nombre = nombreMatch[1]
  }

  // =====================================================
  // PRIORITE 1 : BOUTONS CTA EXACTS
  // =====================================================
  const CTA_MAP: Record<string, { intent: string; response: string }> = {
    'Suivi de commande': {
      intent: 'suivi',
      response: "Je vais vous aider pour le suivi de votre commande ! Pouvez-vous me donner votre numero de commande (format JCD-XXXX) ou votre adresse email de commande ?"
    },
    'Delais de livraison': {
      intent: 'delais',
      response: "Apres validation de votre commande, vous recevez votre apercu maquette sous 24h. Apres validation de l'apercu, la creation et livraison prennent 5 a 10 jours ouvres. Avez-vous une date d'evenement precise ?"
    },
    'Personnalisation': {
      intent: 'perso',
      response: "Tous nos produits sont 100% personnalisables ! Prenom, couleurs, theme, police, texte... tout est sur mesure. C'est pour quel type d'evenement ? (mariage, bapteme, anniversaire, autre)"
    },
    'Tarifs & Devis': {
      intent: 'devis',
      response: "Voici un apercu de nos tarifs : confiseries personnalisees a partir de 1 euro, boites et emballages a partir de 2,30 euros, tasses et gourdes de 20 a 25 euros, t-shirts de 25 a 30 euros, papeterie sur devis. C'est pour quel type de projet ?"
    }
  }

  if (CTA_MAP[userMessage]) {
    const cta = CTA_MAP[userMessage]
    newState.lastIntent = cta.intent
    newState.step = 1
    newState.fallbackCount = 0
    return { response: cta.response, newState }
  }

  // =====================================================
  // PRIORITE 2 : FLOW EN COURS (suite de conversation)
  // =====================================================
  const last = state.lastIntent
  const step = state.step

  // Flow suivi commande
  if (last === 'suivi') {
    newState.step = 0
    newState.lastIntent = null
    return {
      response: "Merci ! Je transmets votre demande a Anais immediatement. Vous recevrez une reponse sous 2h pendant les horaires d'ouverture (Lun-Ven 7h-19h, Week-end 10h-17h). Vous pouvez aussi suivre depuis votre espace client sur le site.",
      newState
    }
  }

  // Flow delais
  if (last === 'delais') {
    if (step === 1) {
      newState.step = 2
      return { response: "Parfait ! C'est pour quel type d'evenement ? (mariage, bapteme, anniversaire, professionnel, autre)", newState }
    }
    if (step === 2) {
      newState.step = 3
      return { response: "Super ! Pour combien de personnes environ ? Cela m'aide a vous orienter vers les bons produits.", newState }
    }
    if (step === 3) {
      newState.step = 4
      return { response: "Tres bien ! Souhaitez-vous recevoir un devis personnalise par email ? Anais vous le prepare sous 24h.", newState }
    }
    if (step === 4) {
      if (/oui|yes|ok|bien sur|volontiers|exactement|parfait|je veux/.test(t)) {
        newState.step = 5
        return { response: "Parfait ! Laissez-moi votre adresse email et Anais vous enverra un devis detaille sous 24h.", newState }
      } else {
        newState.step = 0
        newState.lastIntent = null
        return { response: "Pas de probleme ! N'hesitez pas a revenir si vous avez des questions. Vous pouvez aussi nous contacter directement sur Instagram @jays_creations_design.", newState }
      }
    }
    if (step === 5 && newState.data.email) {
      newState.step = 0
      newState.lastIntent = null
      return { response: "Merci ! Votre demande a bien ete transmise. Anais vous contacte sous 24h avec votre devis personnalise. A tres bientot !", newState }
    }
    if (step === 5) {
      return { response: "Je n'ai pas bien saisi votre email. Pouvez-vous le retaper s'il vous plait ?", newState }
    }
  }

  // Flow personnalisation
  if (last === 'perso') {
    if (step === 1) {
      newState.step = 2
      return { response: "Excellent choix ! Vous avez deja un theme ou des couleurs en tete ? (ex: champetre, tropical, pastel, moderne, gold, boheme, minimaliste)", newState }
    }
    if (step === 2) {
      newState.step = 3
      return { response: "J'adore ! Anais cree votre maquette unique. Apres commande vous recevez un apercu sous 24h avec retouches possibles. Quelle est votre date d'evenement ?", newState }
    }
    if (step === 3) {
      newState.step = 4
      return { response: "Parfait ! Pour vous envoyer des exemples personnalises et commencer votre creation, j'ai besoin de votre adresse email.", newState }
    }
    if (step === 4 && newState.data.email) {
      newState.step = 0
      newState.lastIntent = null
      return { response: "Merci beaucoup ! Anais va vous preparer des exemples personnalises et vous les enverra sous 24h. On a hate de sublimer votre evenement !", newState }
    }
    if (step === 4) {
      return { response: "Je n'ai pas bien saisi votre email. Pouvez-vous le retaper ?", newState }
    }
  }

  // Flow devis
  if (last === 'devis') {
    if (step === 1) {
      newState.step = 2
      return { response: "Pour les commandes groupees (mariage, bapteme, anniversaire) nous proposons des tarifs speciaux ! C'est pour quel evenement ?", newState }
    }
    if (step === 2) {
      newState.step = 3
      return { response: "Combien de personnes attendez-vous ? Cela nous permet de calculer les quantites et vous faire un prix au plus juste.", newState }
    }
    if (step === 3) {
      newState.step = 4
      return { response: "Quels produits vous interessent ? (confiseries, etiquettes boissons, boites, tasses, t-shirts, papeterie, sweet table, tout le catalogue)", newState }
    }
    if (step === 4) {
      newState.step = 5
      return { response: "Pour vous envoyer un devis precis avec les meilleures options, j'ai besoin de votre adresse email.", newState }
    }
    if (step === 5 && newState.data.email) {
      newState.step = 0
      newState.lastIntent = null
      return { response: "Parfait ! Votre demande de devis a ete transmise a Anais. Vous recevrez un devis personnalise sous 24h. Merci de votre confiance !", newState }
    }
    if (step === 5) {
      return { response: "Je n'ai pas bien saisi votre email. Pouvez-vous le retaper ?", newState }
    }
  }

  // =====================================================
  // PRIORITE 3 : DETECTION LIBRE PAR MOTS-CLES
  // =====================================================
  const intent = detectIntent(userMessage)

  const INTENT_RESPONSES: Record<string, { response: string; intent: string | null }> = {
    mariage: {
      intent: 'devis',
      response: "Felicitations pour votre mariage ! Nous adorons habiller les tables de mariage. Nos specialites : faire-parts, menus, marque-places, etiquettes boissons, confiseries assorties, sweet table complete. Combien d'invites attendez-vous ?"
    },
    bapteme: {
      intent: 'devis',
      response: "Quel beau projet pour ce bapteme ! Collections completes assorties : faire-parts, etiquettes, boites dragees, confiseries, cadeaux invites. C'est pour un petit garcon ou une petite fille ?"
    },
    anniversaire: {
      intent: 'devis',
      response: "Super ! Pour un anniversaire nous assortissons tout au theme choisi : etiquettes boissons, boites confiseries, stickers, sweet table... C'est pour quel age et quel theme ?"
    },
    ramadan: {
      intent: 'devis',
      response: "Pour Ramadan et Aid nous avons des collections speciales ! Boites de confiseries, plateaux, emballages cadeaux, etiquettes... tout personnalise. Vous avez un theme couleur en tete ?"
    },
    confiseries: {
      intent: 'devis',
      response: "Nos confiseries personnalisees : Kinder Maxi (2,50 euros), Mini Nutella (2,70 euros), Haribo (2,80 euros), M&Ms et Smarties (3,00 euros), Sachet bonbons (2,50 euros). Tout assorti a votre theme ! C'est pour quel evenement ?"
    },
    etiquettes: {
      intent: 'devis',
      response: "Nos etiquettes : bouteille eau (1 euro), Capri-Sun (1,50 euro), Canette Coca (1,80 euro), Champomy (2,50 euros). Parfait pour les tables enfants ! Quel est votre theme ?"
    },
    boites: {
      intent: 'devis',
      response: "Nos boites : Box Pyramide (2,99 euros), Boite Pom Potes (2,30 euros), Pop Corn (2,50-5,50 euros), Sac cadeau (2,90 euros), Plateau et Boite cadeau sur devis. C'est pour combien de personnes ?"
    },
    textile: {
      intent: 'devis',
      response: "Pour le flocage textile : T-shirt personnalise de 25 a 30 euros, planche etiquette thermocollante sur devis. On imprime votre prenom, logo, design... Vous avez un visuel en tete ?"
    },
    objets: {
      intent: 'devis',
      response: "Nos objets : Tasse personnalisee (20 euros), Gourde (25 euros), Cadre (15 euros). Sublimation haute qualite. C'est pour offrir ou pour un evenement ?"
    },
    papeterie: {
      intent: 'devis',
      response: "Notre papeterie evenementielle est entierement sur mesure ! Faire-parts, invitations, menus, marque-places, stickers... Prix sur devis selon quantites. Vous avez une date d'evenement ?"
    },
    pro: {
      intent: 'devis',
      response: "Pour les professionnels : flyers, cartes de visite, stickers logo, t-shirts personnalises, objets publicitaires... Tout sur devis. C'est pour quel secteur d'activite ?"
    },
    contact: {
      intent: null,
      response: "Vous pouvez joindre Anais directement : Email contact@jayscreationsdesign.fr | Tel 07 49 07 28 61 | Instagram @jays_creations_design | Horaires Lun-Ven 7h-19h, Week-end 10h-17h."
    }
  }

  if (intent && INTENT_RESPONSES[intent]) {
    const match = INTENT_RESPONSES[intent]
    newState.lastIntent = match.intent
    newState.step = match.intent === 'devis' ? 2 : 1
    newState.fallbackCount = 0
    return { response: match.response, newState }
  }

  // =====================================================
  // FALLBACK INTELLIGENT
  // =====================================================
  newState.fallbackCount = (state.fallbackCount || 0) + 1

  if (newState.fallbackCount >= 3) {
    newState.fallbackCount = 0
    newState.lastIntent = null
    return {
      response: "Je vais vous mettre en contact directement avec Anais ! Ecrivez-lui a contact@jayscreationsdesign.fr ou sur Instagram @jays_creations_design. Elle vous repond rapidement !",
      newState
    }
  }

  if (newState.fallbackCount === 2) {
    return {
      response: "Je ne suis pas sure de comprendre. Voulez-vous un devis, des infos sur les delais, suivre une commande, ou parler de personnalisation ?",
      newState
    }
  }

  newState.lastIntent = null
  return {
    response: "Merci pour votre message ! Pour vous aider au mieux, choisissez un sujet parmi les boutons ci-dessous ou decrivez votre projet.",
    newState
  }
}

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================

const QUICK_REPLIES = ['Suivi de commande', 'Delais de livraison', 'Personnalisation', 'Tarifs & Devis']

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)
  const [chatState, setChatState] = useState<ChatState>({
    lastIntent: null, step: 0, data: {}, fallbackCount: 0
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        content: "Bonjour ! Je suis ravie de vous accueillir chez Jay's Creations Design. Comment puis-je vous aider ?",
        sender: 'admin',
        created_at: new Date().toISOString()
      }])
    }
    if (isOpen) setHasUnread(false)
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    setMessages(prev => [...prev, {
      id: crypto.randomUUID(),
      content,
      sender: 'visitor',
      created_at: new Date().toISOString()
    }])
    setInput('')

    const { response, newState } = getNextResponse(content, chatState)
    setChatState(newState)

    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        content: response,
        sender: 'admin',
        created_at: new Date().toISOString()
      }])

      // Envoie email si on a collecte un email client
      if (newState.data.email?.includes('@')) {
        fetch('/api/chat/message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content,
            visitorId: typeof window !== 'undefined'
              ? localStorage.getItem('jcd_visitor_id') || crypto.randomUUID()
              : crypto.randomUUID(),
            conversationData: newState.data,
            topic: newState.lastIntent || 'General'
          })
        }).catch(e => console.error('Chat API error:', e))
      }
    }, 800 + Math.random() * 600)
  }

  const showQuickReplies = chatState.lastIntent === null

  return (
    <>
      {/* Bouton flottant */}
      <div onClick={() => setIsOpen(!isOpen)} style={{
        position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
        width: '56px', height: '56px', borderRadius: '50%',
        background: '#6B3A2A', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(107,58,42,0.4)'
      }}>
        {hasUnread && <div style={{
          position: 'absolute', top: '-4px', right: '-4px',
          width: '16px', height: '16px', borderRadius: '50%',
          background: '#C8A96E', border: '2px solid white'
        }} />}
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </div>

      {/* Fenetre chat */}
      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '90px', right: '24px', zIndex: 9998,
          width: '340px', height: '520px', borderRadius: '16px',
          background: '#FAF7F2', boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          fontFamily: 'Inter, sans-serif'
        }}>
          {/* Header */}
          <div style={{
            background: '#6B3A2A', padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: '#C8A96E', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '13px', fontWeight: '700', color: 'white', flexShrink: 0
            }}>JC</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>
                Jay's Creations Design
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />
                <span style={{ color: '#C8A96E', fontSize: '11px' }}>En ligne · Repond en moins d'1h</span>
              </div>
            </div>
            <div onClick={() => setIsOpen(false)} style={{
              cursor: 'pointer', color: 'rgba(255,255,255,0.7)',
              fontSize: '20px', lineHeight: 1, padding: '4px'
            }}>x</div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '16px',
            display: 'flex', flexDirection: 'column', gap: '10px'
          }}>
            {messages.map(msg => (
              <div key={msg.id} style={{
                display: 'flex',
                justifyContent: msg.sender === 'visitor' ? 'flex-end' : 'flex-start',
                gap: '8px', alignItems: 'flex-end'
              }}>
                {msg.sender === 'admin' && (
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: '#C8A96E', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', color: 'white', fontWeight: '700', flexShrink: 0
                  }}>JC</div>
                )}
                <div style={{
                  maxWidth: '230px', padding: '10px 14px',
                  borderRadius: msg.sender === 'visitor' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  background: msg.sender === 'visitor' ? '#6B3A2A' : 'white',
                  color: msg.sender === 'visitor' ? 'white' : '#2C1810',
                  border: msg.sender === 'admin' ? '1px solid #e8e0d0' : 'none',
                  fontSize: '13px', lineHeight: '1.5'
                }}>{msg.content}</div>
              </div>
            ))}

            {/* Indicateur frappe */}
            {isTyping && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: '#C8A96E', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '10px', color: 'white', fontWeight: '700'
                }}>JC</div>
                <div style={{
                  background: 'white', border: '1px solid #e8e0d0',
                  borderRadius: '12px', padding: '10px 14px',
                  display: 'flex', gap: '4px', alignItems: 'center'
                }}>
                  {[1, 0.6, 0.3].map((op, i) => (
                    <div key={i} style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: '#C8A96E', opacity: op
                    }} />
                  ))}
                </div>
              </div>
            )}

            {/* Bouton retour au menu principal */}
            {chatState.lastIntent !== null && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '4px' }}>
                <button
                  onClick={() => {
                    setChatState({ lastIntent: null, step: 0, data: {}, fallbackCount: 0 })
                    setMessages(prev => [...prev, {
                      id: crypto.randomUUID(),
                      content: "Retour au menu principal",
                      sender: 'visitor',
                      created_at: new Date().toISOString()
                    }, {
                      id: crypto.randomUUID(),
                      content: "Pas de probleme ! Comment puis-je vous aider ? Choisissez un sujet :",
                      sender: 'admin',
                      created_at: new Date().toISOString()
                    }])
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    border: '1px solid #e8e0d0',
                    background: 'transparent',
                    color: '#9a8880',
                    fontSize: '11px',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                  Retour au menu
                </button>
              </div>
            )}

            {/* Boutons de navigation - affiches pendant un flow actif */}
            {chatState.lastIntent && chatState.step > 1 && (
              <div style={{ display: 'flex', gap: '6px', marginTop: '4px', marginBottom: '8px' }}>
                <button 
                  onClick={() => sendMessage("retour")}
                  style={{
                    padding: '4px 8px', borderRadius: '16px',
                    border: '1px solid #e8e0d0', background: '#f8f5f0',
                    color: '#6B3A2A', fontSize: '11px', cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif', display: 'flex',
                    alignItems: 'center', gap: '4px'
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                  Retour
                </button>
                <button 
                  onClick={() => sendMessage("menu")}
                  style={{
                    padding: '4px 8px', borderRadius: '16px',
                    border: '1px solid #e8e0d0', background: '#f8f5f0',
                    color: '#6B3A2A', fontSize: '11px', cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  Menu
                </button>
              </div>
            )}

            {/* Boutons CTA - affiches quand pas de flow actif */}
            {chatState.lastIntent === null && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                {['Suivi de commande', 'Delais de livraison', 'Personnalisation', 'Tarifs & Devis'].map(reply => (
                  <button
                    key={reply}
                    onClick={() => sendMessage(reply)}
                    style={{
                      padding: '6px 12px', borderRadius: '20px',
                      border: '1px solid #C8A96E', background: 'white',
                      color: '#6B3A2A', fontSize: '12px', cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >{reply}</button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '12px 16px', background: 'white',
            borderTop: '1px solid #f0ebe4',
            display: 'flex', gap: '8px', alignItems: 'center'
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Tapez votre message..."
              style={{
                flex: 1, padding: '8px 14px', borderRadius: '20px',
                border: '1px solid #e8e0d0', background: '#FAF7F2',
                fontSize: '13px', outline: 'none', fontFamily: 'Inter, sans-serif'
              }}
            />
            <button onClick={() => sendMessage(input)} style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: input.trim() ? '#6B3A2A' : '#d4c4bc',
              border: 'none', cursor: input.trim() ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>

          {/* Horaires */}
          <div style={{
            padding: '8px 16px', background: 'white',
            borderTop: '1px solid #f0ebe4', textAlign: 'center'
          }}>
            <span style={{ fontSize: '10px', color: '#b0a89e' }}>
              Lun-Ven 7h-19h · Week-end 10h-17h
            </span>
          </div>
        </div>
      )}
    </>
  )
}