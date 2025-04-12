const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItemModel');

exports.createOrder = async (req, res) => {
  const { user_id, items, total_price, status } = req.body;

  try {
    const order = await Order.create({
      user_id,
      total_price,
      status: status || 'pending'
    });

    const orderItemsData = items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity
    }));

    await OrderItem.bulkCreate(orderItemsData);

    res.status(201).json({ order, items: orderItemsData });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUserOrders = async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await Order.findAll({
      where: { user_id: userId },
      include: [OrderItem]
    });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
