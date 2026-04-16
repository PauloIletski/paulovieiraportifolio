import { useCart } from "../context";

  const handleSendMessage = () => {
 
    const whatsappNumber = "5517981048717";
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {items} = useCart();
 
    if (items.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
    const message = `Olá+!+quero+trocar+uma+ideia+sobre+${items.map(item => item.name).join(",")}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(whatsappUrl, "_blank");
  };

export default handleSendMessage;