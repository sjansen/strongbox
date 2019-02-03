package main

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

var quotes = []string{
	"Despite all my rage I am still just a rat in a cage ",
	"I get knocked down, but I get up again.",
	"I'm the Scatman!",
	"If you want to destroy my sweater, hold this thread as I walk away.",
	"Kilroy was here.",
	"Make a little birdhouse in your soul.",
	"Movin' to the country, gonna eat a lot of peaches.",
	"Soy un perdedor.",
	"Spoon!",
	"The world is a vampire.",
}

func init() {
	rand.Seed(time.Now().UnixNano())
}

func handler(req events.APIGatewayProxyRequest) (resp events.APIGatewayProxyResponse, err error) {
	fmt.Printf("%s %q\n", req.HTTPMethod, req.Path)
	fmt.Printf("Authorizer %#v\n", req.RequestContext.Authorizer)

	body, err := json.Marshal(map[string]string{
		"quote": quotes[rand.Intn(len(quotes))],
	})
	if err != nil {
		resp.StatusCode = 500
		resp.Headers = map[string]string{
			"Cache-Control": "no-cache, no-store, must-revalidate",
			"Content-Type":  "text/text; charset=utf-8",
		}
		resp.Body = fmt.Sprintf("x-amzn-trace-id=%q.\n", req.Headers["x-amzn-trace-id"])
		return
	}

	resp.StatusCode = 200
	resp.Headers = map[string]string{
		"Cache-Control": "max-age=15",
		"Content-Type":  "application/json; charset=utf-8",
	}
	resp.Body = string(body)
	return
}

func main() {
	lambda.Start(handler)
}
