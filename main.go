package main

import (
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(req events.APIGatewayProxyRequest) (resp events.APIGatewayProxyResponse, err error) {
	fmt.Printf("x-amzn-trace-id=%q.\n", req.Headers["x-amzn-trace-id"])

	resp.StatusCode = 200
	resp.Headers = map[string]string{"Content-Type": "application/json; charset=utf-8"}
	resp.Body = `{"quote": "Spoon!"}`
	return
}

func main() {
	lambda.Start(handler)
}
