const stripe = require('stripe')('sk_test_51OmgFoDkeIrI9yOBHM5R1YWrBhkvgXif1PiKqIKwHAbhao4Izr3gdkkIHclEhPPN3KChY9www2lQmDcdhV3zGpa300tni8lw9a')


const createCustomer = async (email) => {
    try {
        const customer = await stripe.customers.create({
            email: email
        })
        return customer?.id
    }
    catch (e) {
        console.log(e)
    }
}


const payment = async (amount, customerId) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'pkr',
        customer: customerId,
        automatic_payment_methods: {
            enabled: true,
        },
    });
    return paymentIntent
}

const payout = async (amount, customerId) => {
    const payout = await stripe.payouts.create({
        amount: amount,
        currency: 'pkr',
        destination: customerId
    });
}

const addCustomerCard = async (pmId, cus) => {
    const paymentMethod = await stripe.paymentMethods.attach(
        pmId,
        {
            customer: cus,
        }
    );
}

module.exports = { createCustomer, payment, payout, addCustomerCard }